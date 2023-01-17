// reference component https://github.com/basst314/ngx-webcam

import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';

  
import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {WebcamMirrorProperties} from './domain/webcam-mirror-properties';
import {WebcamInitError} from './domain/webcam-init-error';
import {WebcamImage} from './domain/webcam-image';
import {Observable, Subscription} from 'rxjs';
import {WebcamUtil} from './util/webcam.util';


//import  *  as faceapi from '../../../../js/facedetection/face-api.js';


declare var faceapi: any;

@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class WebcamComponent implements OnInit, AfterViewInit, OnDestroy {

  //private faceApi = window.faceapi;

  private static DEFAULT_VIDEO_OPTIONS: MediaTrackConstraints = {facingMode: 'environment'};
  private static DEFAULT_IMAGE_TYPE: string = 'image/jpeg';
  private static DEFAULT_IMAGE_QUALITY: number = 0.92;

  @Input() public hiddenCanva: boolean = true;

  /** Defines the max width of the webcam area in px */
  @Input() public width: number = 640;
  /** Defines the max height of the webcam area in px */
  @Input() public height: number = 480;
  /** Defines base constraints to apply when requesting video track from UserMedia */
  @Input() public videoOptions: MediaTrackConstraints = WebcamComponent.DEFAULT_VIDEO_OPTIONS;
  /** Flag to enable/disable camera switch. If enabled, a switch icon will be displayed if multiple cameras were found */
  @Input() public allowCameraSwitch: boolean = true;
  /** Parameter to control image mirroring (i.e. for user-facing camera). ["auto", "always", "never"] */
  @Input() public mirrorImage: string | WebcamMirrorProperties;
  /** Flag to control whether an ImageData object is stored into the WebcamImage object. */
  @Input() public captureImageData: boolean = false;
  /** The image type to use when capturing snapshots */
  @Input() public imageType: string = WebcamComponent.DEFAULT_IMAGE_TYPE;
  /** The image quality to use when capturing snapshots (number between 0 and 1) */
  @Input() public imageQuality: number = WebcamComponent.DEFAULT_IMAGE_QUALITY;

  /** EventEmitter which fires when an image has been captured */
  @Output() public imageCapture: EventEmitter<WebcamImage> = new EventEmitter<WebcamImage>();
  /** Emits a mediaError if webcam cannot be initialized (e.g. missing user permissions) */
  @Output() public initError: EventEmitter<WebcamInitError> = new EventEmitter<WebcamInitError>();
  /** Emits when the webcam video was clicked */
  @Output() public imageClick: EventEmitter<void> = new EventEmitter<void>();
  /** Emits the active deviceId after the active video device was switched */
  @Output() public cameraSwitched: EventEmitter<string> = new EventEmitter<string>();
  @Output() public faceDetection: EventEmitter<any> = new EventEmitter<any>();

  /** available video devices */
  public availableVideoInputs: MediaDeviceInfo[] = [];

  /** Indicates whether the video device is ready to be switched */
  public videoInitialized: boolean = false;

  /** If the Observable represented by this subscription emits, an image will be captured and emitted through
   * the 'imageCapture' EventEmitter */
  private triggerSubscription: Subscription;
  /** Index of active video in availableVideoInputs */
  private activeVideoInputIndex: number = -1;
  /** Subscription to switchCamera events */
  private switchCameraSubscription: Subscription;
  /** MediaStream object in use for streaming UserMedia data */
  private mediaStream: MediaStream = null;

  @ViewChild('video', { static: true }) private video: any;
  /** Canvas for Video Snapshots */
  @ViewChild('canvas', { static: true }) private canvas: any;

  /** width and height of the active video stream */
  private activeVideoSettings: MediaTrackSettings = null;

   /**
   * If the given Observable emits, an image will be captured and emitted through 'imageCapture' EventEmitter
   */
  @Input()
  public set trigger(trigger: Observable<void>) {
    if (this.triggerSubscription) {
      this.triggerSubscription.unsubscribe();
    }

    // Subscribe to events from this Observable to take snapshots
    this.triggerSubscription = trigger.subscribe(() => {
      this.takeSnapshot();
    });
  }

  /**
   * If the given Observable emits, the active webcam will be switched to the one indicated by the emitted value.
   * @param switchCamera Indicates which webcam to switch to
   *   true: cycle forwards through available webcams
   *   false: cycle backwards through available webcams
   *   string: activate the webcam with the given id
   */
  @Input()
  public set switchCamera(switchCamera: Observable<boolean | string>) {
    if (this.switchCameraSubscription) {
      this.switchCameraSubscription.unsubscribe();
    }

    // Subscribe to events from this Observable to switch video device
    this.switchCameraSubscription = switchCamera.subscribe((value: boolean | string) => {
      if (typeof value === 'string') {
        // deviceId was specified
        this.switchToVideoInput(value);
      } else {
        // direction was specified
        this.rotateVideoInput(value !== false);
      }
    });
  }

  /**
   * Get MediaTrackConstraints to request streaming the given device
   * @param deviceId
   * @param baseMediaTrackConstraints base constraints to merge deviceId-constraint into
   * @returns
   */
  private static getMediaConstraintsForDevice(deviceId: string, baseMediaTrackConstraints: MediaTrackConstraints): MediaTrackConstraints {
    const result: MediaTrackConstraints = baseMediaTrackConstraints ? baseMediaTrackConstraints : this.DEFAULT_VIDEO_OPTIONS;
    if (deviceId) {
      result.deviceId = {exact: deviceId};
    }

    return result;
  }

  /**
   * Tries to harvest the deviceId from the given mediaStreamTrack object.
   * Browsers populate this object differently; this method tries some different approaches
   * to read the id.
   * @param mediaStreamTrack
   * @returns deviceId if found in the mediaStreamTrack
   */
  private static getDeviceIdFromMediaStreamTrack(mediaStreamTrack: MediaStreamTrack): string {
    if (mediaStreamTrack.getSettings && mediaStreamTrack.getSettings() && mediaStreamTrack.getSettings().deviceId) {
      return mediaStreamTrack.getSettings().deviceId;
    } else if (mediaStreamTrack.getConstraints && mediaStreamTrack.getConstraints() && mediaStreamTrack.getConstraints().deviceId) {
      const deviceIdObj: ConstrainDOMString = mediaStreamTrack.getConstraints().deviceId;
      return WebcamComponent.getValueFromConstrainDOMString(deviceIdObj);
    }
  }


  /**
   * Tries to harvest the facingMode from the given mediaStreamTrack object.
   * Browsers populate this object differently; this method tries some different approaches
   * to read the value.
   * @param mediaStreamTrack
   * @returns facingMode if found in the mediaStreamTrack
   */
  private static getFacingModeFromMediaStreamTrack(mediaStreamTrack: MediaStreamTrack): string {
    if (mediaStreamTrack) {
      if (mediaStreamTrack.getSettings && mediaStreamTrack.getSettings() && mediaStreamTrack.getSettings().facingMode) {
        return mediaStreamTrack.getSettings().facingMode;
      } else if (mediaStreamTrack.getConstraints && mediaStreamTrack.getConstraints() && mediaStreamTrack.getConstraints().facingMode) {
        const facingModeConstraint: ConstrainDOMString = mediaStreamTrack.getConstraints().facingMode;
        return WebcamComponent.getValueFromConstrainDOMString(facingModeConstraint);
      }
    }
  }

  /**
   * Determines whether the given mediaStreamTrack claims itself as user facing
   * @param mediaStreamTrack
   */
  private static isUserFacing(mediaStreamTrack: MediaStreamTrack): boolean {
    const facingMode: string = WebcamComponent.getFacingModeFromMediaStreamTrack(mediaStreamTrack);
    return facingMode ? 'user' === facingMode.toLowerCase() : false;
  }

  /**
   * Extracts the value from the given ConstrainDOMString
   * @param constrainDOMString
   */
  private static getValueFromConstrainDOMString(constrainDOMString: ConstrainDOMString): string {
    if (constrainDOMString) {
      if (constrainDOMString instanceof String) {
        return String(constrainDOMString);
      } else if (Array.isArray(constrainDOMString) && Array(constrainDOMString).length > 0) {
        return String(constrainDOMString[0]);
      } else if (typeof constrainDOMString === 'object') {
        if (constrainDOMString['exact']) {
          return String(constrainDOMString['exact']);
        } else if (constrainDOMString['ideal']) {
          return String(constrainDOMString['ideal']);
        }
      }
    }

    return null;
  }

  public ngAfterViewInit(): void {
    this.detectAvailableDevices()
      .then(() => {
        // start video
        this.switchToVideoInput(null);
      }).then(() => {
        //const _video = this.nativeVideoElement;
        //console.log("_video -> ",_video)
      }).catch((err: string) => {
        this.initError.next(<WebcamInitError>{message: err});
        // fallback: still try to load webcam, even if device enumeration failed
        this.switchToVideoInput(null);
      });
  }

  public ngOnDestroy(): void {
    this.stopMediaTracks();
    this.unsubscribeFromSubscriptions();
  }

  /**
   * Takes a snapshot of the current webcam's view and emits the image as an event
   */
  public takeSnapshot(): void {
    // set canvas size to actual video size
    const _video = this.nativeVideoElement;
    const dimensions = {width: this.width, height: this.height};
    if (_video.videoWidth) {
      dimensions.width = _video.videoWidth;
      dimensions.height = _video.videoHeight;
    }

    const _canvas = this.canvas.nativeElement;
    _canvas.width = dimensions.width;
    _canvas.height = dimensions.height;

    // paint snapshot image to canvas
    const context2d = _canvas.getContext('2d');
    context2d.drawImage(_video, 0, 0);

    // read canvas content as image
    const mimeType: string = this.imageType ? this.imageType : WebcamComponent.DEFAULT_IMAGE_TYPE;
    const quality: number = this.imageQuality ? this.imageQuality : WebcamComponent.DEFAULT_IMAGE_QUALITY;
    const dataUrl: string = _canvas.toDataURL(mimeType, quality);

    // get the ImageData object from the canvas' context.
    let imageData: ImageData = null;

    if (this.captureImageData) {
      imageData = context2d.getImageData(0, 0, _canvas.width, _canvas.height);
    }

    this.imageCapture.next(new WebcamImage(dataUrl, mimeType, imageData));
  }

  /**
   * Switches to the next/previous video device
   * @param forward
   */
  public rotateVideoInput(forward: boolean) {
    if (this.availableVideoInputs && this.availableVideoInputs.length > 1) {
      const increment: number = forward ? 1 : (this.availableVideoInputs.length - 1);
      const nextInputIndex = (this.activeVideoInputIndex + increment) % this.availableVideoInputs.length;
      this.switchToVideoInput(this.availableVideoInputs[nextInputIndex].deviceId);
    }
  }

  /**
   * Switches the camera-view to the specified video device
   */
  public switchToVideoInput(deviceId: string): void {
    this.videoInitialized = false;
    this.stopMediaTracks();
    this.initWebcam(deviceId, this.videoOptions);
  }


  /**
   * Event-handler for video resize event.
   * Triggers Angular change detection so that new video dimensions get applied
   */
  public videoResize(): void {
    // here to trigger Angular change detection
  }

  public get videoWidth() {
    const videoRatio = this.getVideoAspectRatio();
    return Math.min(this.width, this.height * videoRatio);
  }

  public get videoHeight() {
    const videoRatio = this.getVideoAspectRatio();
    return Math.min(this.height, this.width / videoRatio);
  }

  public get videoStyleClasses() {
    let classes: string = '';

    classes += 'rounded-circle video-face ';

    if (this.isMirrorImage()) {
      classes += 'mirrored ';
    }

    return classes.trim();
  }

  public get nativeVideoElement() {
    return this.video.nativeElement;
  }

  /**
   * Returns the video aspect ratio of the active video stream
   */
  private getVideoAspectRatio(): number {
    // calculate ratio from video element dimensions if present
    const videoElement = this.nativeVideoElement;
    if (videoElement.videoWidth && videoElement.videoWidth > 0 &&
      videoElement.videoHeight && videoElement.videoHeight > 0) {

      return videoElement.videoWidth / videoElement.videoHeight;
    }

    // nothing present - calculate ratio based on width/height params
    return this.width / this.height;
  }

  /**
   * Init webcam live view
   */
  private initWebcam(deviceId: string, userVideoTrackConstraints: MediaTrackConstraints) {
    const _video = this.nativeVideoElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

      // merge deviceId -> userVideoTrackConstraints
      const videoTrackConstraints = WebcamComponent.getMediaConstraintsForDevice(deviceId, userVideoTrackConstraints);

      navigator.mediaDevices.getUserMedia(<MediaStreamConstraints>{video: videoTrackConstraints})
        .then((stream: MediaStream) => {

          _video.addEventListener('play',  async () => {  await this.onPlay(_video) })



          this.mediaStream = stream;
          _video.srcObject = stream;
          _video.play();

          this.activeVideoSettings = stream.getVideoTracks()[0].getSettings();
          const activeDeviceId: string = WebcamComponent.getDeviceIdFromMediaStreamTrack(stream.getVideoTracks()[0]);

          this.cameraSwitched.next(activeDeviceId);

          // Initial detect may run before user gave permissions, returning no deviceIds. This prevents later camera switches. (#47)
          // Run detect once again within getUserMedia callback, to make sure this time we have permissions and get deviceIds.
          this.detectAvailableDevices()
            .then(() => {
              this.activeVideoInputIndex = activeDeviceId ? this.availableVideoInputs
                .findIndex((mediaDeviceInfo: MediaDeviceInfo) => mediaDeviceInfo.deviceId === activeDeviceId) : -1;
              this.videoInitialized = true; 

          
            })
            .catch(() => {
              this.activeVideoInputIndex = -1;
              this.videoInitialized = true;
            });
        }).then(()=>{          

        }).catch((err: MediaStreamError) => {          
          this.initError.next(<WebcamInitError>{message: err.message, mediaStreamError: err});
        });
    } else {
      this.initError.next(<WebcamInitError>{message: 'Cannot read UserMedia from MediaDevices.'});
    }
  }

  private  async onPlay(video) {
    console.log("onPlay")
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('assets/js/facedetection/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('assets/js/facedetection/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('assets/js/facedetection/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('assets/js/facedetection/models')
    ]).then( async ()=>{
      console.log("loaded all models face")

      const canvas = await faceapi.createCanvasFromMedia(video)
      canvas.id="canva-face"
      canvas.style="position: absolute;top: 0;left: 0;"     

      document.getElementById("webcam-wrapper").append(canvas)
      
      const displaySize = { width: video.width, height: video.height }
      faceapi.matchDimensions(canvas, displaySize)  
      
      const minConfidence = 0.5

      setInterval(async ()=>{      

        if(!video.paused || !video.ended){

          const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()

          //console.log("detections",detections)          
          
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

          if (detections){
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            faceapi.draw.drawDetections(canvas, resizedDetections)
            //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
            if (detections.expressions.happy >0.5)
              faceapi.draw.drawFaceExpressions(canvas, resizedDetections,minConfidence)

            
            
          }
          
          // emite el evento faceDetection
          this.faceDetection.next(detections)

        }

      },500)
    })

    
  }

 

  private getActiveVideoTrack(): MediaStreamTrack {
    return this.mediaStream ? this.mediaStream.getVideoTracks()[0] : null;
  }

  private isMirrorImage(): boolean {
    if (!this.getActiveVideoTrack()) {
      return false;
    }

    // check for explicit mirror override parameter
    {
      let mirror: string = 'auto';
      if (this.mirrorImage) {
        if (typeof this.mirrorImage === 'string') {
          mirror = String(this.mirrorImage).toLowerCase();
        } else {
          // WebcamMirrorProperties
          if (this.mirrorImage.x) {
            mirror = this.mirrorImage.x.toLowerCase();
          }
        }
      }

      switch (mirror) {
        case 'always':
          return true;
        case 'never':
          return false;
      }
    }

    // default: enable mirroring if webcam is user facing
    return WebcamComponent.isUserFacing(this.getActiveVideoTrack());
  }

  /**
   * Stops all active media tracks.
   * This prevents the webcam from being indicated as active,
   * even if it is no longer used by this component.
   */
  private stopMediaTracks() {
    if (this.mediaStream && this.mediaStream.getTracks) {
      // getTracks() returns all media tracks (video+audio)
      this.mediaStream.getTracks()
        .forEach((track: MediaStreamTrack) => track.stop());
    }
  }

  /**
   * Unsubscribe from all open subscriptions
   */
  private unsubscribeFromSubscriptions() {
    if (this.triggerSubscription) {
      this.triggerSubscription.unsubscribe();
    }
    if (this.switchCameraSubscription) {
      this.switchCameraSubscription.unsubscribe();
    }
  }


  /**
   * Reads available input devices
   */
  private detectAvailableDevices(): Promise<MediaDeviceInfo[]> {
    return new Promise((resolve, reject) => {
      WebcamUtil.getAvailableVideoInputs()
        .then((devices: MediaDeviceInfo[]) => {
          this.availableVideoInputs = devices;
          resolve(devices);
        })
        .catch(err => {
          this.availableVideoInputs = [];
          reject(err);
        });
    });
  }



  constructor() { }

  ngOnInit(): void {

    

  }

}
