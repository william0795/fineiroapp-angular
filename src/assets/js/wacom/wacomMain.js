var wacomSignatureBase64Image = null;
function enableRestoreButton()
{
  var btnRestore = document.getElementById("Restore");
    
  if (document.getElementById("chkShowSigText").checked)
  {
    btnRestore.disabled = false;
  }
  else
  {
    btnRestore.disabled = true;
  }
}

/*  This is the main function for capturing the signature from the pad */
function capture(myCallback)
{
  if(!wgssSignatureSDK.running || null == dynCapt)
  {
    print("Session error. Restarting the session.");
    actionWhenRestarted(window.Capture);   // See SigCaptX-SessionControl.js
    return;
  }

  // Construct a hash object to contain the hash
  var hash = new wgssSignatureSDK.Hash(onHashConstructor);
  
  function onHashConstructor(hashV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      GetHash(hash, onGetInitialHash);
    }
    else
    {
      print("Hash Constructor error: " + status);
      if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
      {
        print("Error: invalid session. Restarting the session.");
        actionWhenRestarted(window.Capture);
      }
    }
  }
  
  // If the hash value has been calculated successfully next steps is to capture the signature
  function onGetInitialHash()
  {
    var firstName = document.getElementById("fname").value;
    var lastName = document.getElementById("lname").value;
    var fullName = firstName + " " + lastName;
    
    dynCapt.Capture(sigCtl, fullName, "Document Approval", hash, null, onDynCaptCapture);
  }

  function onDynCaptCapture(dynCaptV, SigObjV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
    {
      print("Error: invalid session. Restarting the session.");
      actionWhenRestarted(window.Capture);  // See SigCaptX-SessionControl.js
    }
    else
    {
      /* Check the status returned from the signature capture */
      switch( status ) 
      {
        case wgssSignatureSDK.DynamicCaptureResult.DynCaptOK:
          sigObj = SigObjV;
          print("Signature captured successfully");

          /* Set the RenderBitmap flags as appropriate depending on whether the user wants to use a picture image or B64 text value */
          if (document.getElementById("chkUseB64Image").checked)
          {
             var outputFlags = wgssSignatureSDK.RBFlags.RenderOutputBase64 | wgssSignatureSDK.RBFlags.RenderColor32BPP;
          } 
          else
          {
             var outputFlags = wgssSignatureSDK.RBFlags.RenderOutputPicture | wgssSignatureSDK.RBFlags.RenderColor32BPP;
          }
          sigObj.RenderBitmap(BITMAP_IMAGEFORMAT, imageBox.clientWidth, imageBox.clientHeight, BITMAP_INKWIDTH, BITMAP_INKCOLOR, BITMAP_BACKGROUNDCOLOR, outputFlags, BITMAP_PADDING_X, BITMAP_PADDING_Y, onRenderBitmap);
          break;

        case wgssSignatureSDK.DynamicCaptureResult.DynCaptCancel:
          print("Signature capture cancelled");
          break;
          
        case wgssSignatureSDK.DynamicCaptureResult.DynCaptPadError:
          print("No capture service available");
          break;
          
        case wgssSignatureSDK.DynamicCaptureResult.DynCaptError:
          print("Tablet Error");
          break;
          
        case wgssSignatureSDK.DynamicCaptureResult.DynCaptNotLicensed:
          print("No valid Signature Capture licence found");
          break;
          
        default: 
          print("Capture Error " + status);
          break;
      }
    }
  }
  
  function onRenderBitmap(sigObjV, bmpObj, status) 
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status) 
    {
      var imageBox = document.getElementById("imageBox");
      var useB64Image = document.getElementById("chkUseB64Image").checked;

      wacomSignatureBase64Image = bmpObj.image.src;
      /* If the user wants to demonstrate the use of B64 image strings then define an image and set its source to the B64 string*/
      if (useB64Image)
      {
         print("base64_image:>"+bmpObj+"<");
         img = new Image();
         img.src = "data:image/png;base64," + bmpObj;
  
         if(null == imageBox.firstChild)
         {
           imageBox.appendChild(img);
         }
         else
         {
            imageBox.replaceChild(img, imageBox.firstChild);
         }
      }
      else
      {
         /* If RenderBitmap generated a standard image (picture) then just place that picture in the img control on the HTML form */
         if(null == imageBox.firstChild)
         {
           imageBox.appendChild(bmpObj.image);
         }
         else
         {
            imageBox.replaceChild(bmpObj.image, imageBox.firstChild);
         }
      }
      /* If the user chose the option to show the SigText value on the form then call the function to do this */
      if (document.getElementById("chkShowSigText").checked)
      {
         sigObjV.GetSigText(onGetSigText);
      }
      myCallback(wacomSignatureBase64Image);
    } 
    else 
    {
      print("Signature Render Bitmap error: " + status);
    }
  }
  
  /* This function takes the SigText value returned by the callback and places it in the txtSignature tag on the form */
  function onGetSigText(sigObjV, text, status) 
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      var txtSignature = document.getElementById("txtSignature");
      txtSignature.value = text;
    }
    else 
    {
      print("Signature Render Bitmap error: " + status);
    }
  }
}

/* This function displays the details of the signature in the text box on the HTML form */

function displaySignatureDetails(sigObj)
{
    if(!wgssSignatureSDK.running || null == sigObj)
    {
      print("Session error. Restarting the session." );
      actionWhenRestarted(window.DisplaySignatureDetails);  // See SigCaptX-SessionControl.js
      return;
    }
    sigObj.GetIsCaptured(onGetIsCaptured);
  
    function onGetIsCaptured(sigObj, isCaptured, status)
    {
      if(wgssSignatureSDK.ResponseStatus.OK == status) 
      {
        if(!isCaptured)
        {
          print("No signature has been captured yet." );
          return;
        }
        sigObj.GetWho(onGetWho);
      }
      else 
      {
        print("Signature GetWho error: " + status);
        if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
        {
          print("Session error. Restarting the session.");
          actionWhenRestarted(window.displaySignatureDetails);  // See SigCaptX-SessionControl.js
        }
      }
    }

    function onGetWho(sigObjV, who, status) 
    {
      if(wgssSignatureSDK.ResponseStatus.OK == status) 
      {
        print("  Name:   " + who);
        var tz = wgssSignatureSDK.TimeZone.TimeLocal;
        sigObj.GetWhen(tz, onGetWhen);
      } 
      else 
      {
        print("Signature GetWho error: " + status);
      }
    }
  
    function onGetWhen(sigObjV, when, status) 
    {
      if(wgssSignatureSDK.ResponseStatus.OK == status) 
      {
        print("  Date:   " + when.toString() );
        sigObj.GetWhy(onGetWhy);
      } 
      else 
      {
        print("Signature GetWhen error: " + status);
      }
    }
  
    function onGetWhy(sigObjV, why, status) 
    {
      if(wgssSignatureSDK.ResponseStatus.OK == status) 
      {
        print("  Reason: " + why);
      } 
      else 
      {
        print("Signature GetWhy error: " + status);
      }
    }  
}

// This function calculates a hash value using the first and last names on the HTML form
function GetHash(hash, callback)
{
  print("Creating hash:");
  hash.Clear(onClear);
  
  function onClear(hashV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status) 
    {
      hash.PutType(wgssSignatureSDK.HashType.HashMD5, onPutType);
    } 
    else 
    {
      print("Hash Clear error: " + status);
    }
  }
  
  function onPutType(hashV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status) 
    {
      var vFname = new wgssSignatureSDK.Variant();
      vFname.Set(document.getElementById("fname").value);
      hash.Add(vFname, onAddFname);
    } 
    else 
    {
      print("Hash PutType error: " + status);
    }
  }
  
  function onAddFname(hashV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status) 
    {
      var vLname = new wgssSignatureSDK.Variant();
      vLname.Set(document.getElementById("lname").value);
      hash.Add(vLname, onAddLname);
    } 
    else 
    {
      print("Hash Add error: " + status);
    }
  }
  
  function onAddLname(hashV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status) 
    {
      callback();
    } 
    else 
    {
      print("Hash Add error: " + status);
    }
  }
}

// This function recalculates the hash value from the first and last names
// and checks it against the hash embedded in the signature object
function verifySignedData()
{
  print("Verifying signed data...");
  if(null == sigObj)
  {
    actionWhenRestarted(window.VerifySig);
    return;
  }
  var hash = null;
  sigObj.GetIsCaptured(onGetIsCaptured);
  
  function onGetIsCaptured(sigObjV, isCaptured, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      if(isCaptured)
      {
        hash = new wgssSignatureSDK.Hash(onHashConstructor);
      }
      else
      {
        print("Signature not captured");
      }
    }
    else
    {
      print("GetIsCaptured error: " + status);
      if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
      {
        print("Error: invalid session. Restarting the session.");
        actionWhenRestarted(window.VerifySig);
      }
    }
  }  
  
  function onHashConstructor(hashV, status)
  {
    if(wgssSignatureSDK.ResponseStatus.OK == status)
    {
      GetHash(hash, onGetHashForVerification);
    }
    else
    {
      print("Hash Constructor error: " + status);
    }
  }
  
  function onGetHashForVerification()
  {
    sigObj.CheckSignedData(hash, onCheckSignedData);
  }
  
  function onCheckSignedData(hash, status)
  {
    print("Verify result: " + status);
    if(wgssSignatureSDK.SignedData.DataGood == status)
    {
      print("Signed Data OK");
    }
    else
    {
      print("Signed Data Has Changed");
    }
  }
}

/* This function clears the current signature image from the signature control on the form */
function clearSignature()
{ 
    var imageBox = document.getElementById("imageBox");
    if(null != imageBox.firstChild)
    {
      imageBox.removeChild(imageBox.firstChild);
    }
    if (null == sigObj)
    {
      actionWhenRestarted(window.ClearSignature);  // See SigCaptX-SessionControl.js
      return;
    }
    sigObj.Clear(onClearSig);
  
    function onClearSig(sigObjV, status)
    {
      if(wgssSignatureSDK.ResponseStatus.OK != status)
      {
        print("ClearSignature() error: " + status);
        if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
        {
          print("Session error. Restarting the session.");
          actionWhenRestarted(window.ClearSignature);  // See SigCaptX-SessionControl.js
        }
      }
    }
}
  
/* This function takes the SigText value currently displayed on the HTML form and uses it to recreate the signature image shown in the signature control tag on the form */
function setSignatureText()
{
    if(null == sigObj)
    {
      actionWhenRestarted(window.SetSignatureText);  // See SigCaptX-SessionControl.js
      return;
    }
    /* First of all take the SigText value currently displayed in the txtSignature field on the form and assign it to the sigObj object */
    var text = document.getElementById("txtSignature").value;
    sigObj.PutSigText(text, onPutSigText);
  
    function onPutSigText(sigObjV, status)
    {
      if(wgssSignatureSDK.ResponseStatus.OK == status)
      {
        /* Now that the sigObj has been populated with the signature data (via the SigText) it can be used to geberate a signature image */
        var outputFlags = wgssSignatureSDK.RBFlags.RenderOutputPicture | wgssSignatureSDK.RBFlags.RenderColor24BPP;
        var imageBox = document.getElementById("imageBox");
        
        sigObj.RenderBitmap(BITMAP_IMAGEFORMAT, imageBox.clientWidth, imageBox.clientHeight, BITMAP_INKWIDTH, BITMAP_INKCOLOR, BITMAP_BACKGROUNDCOLOR, outputFlags, BITMAP_PADDING_X, BITMAP_PADDING_Y, onRenderBitmapFromSigText);
      }
      else
      {
        print("SetSignatureText() error: " + status); 
        if(wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status)
        {
          print("Session error. Restarting the session.");
          actionWhenRestarted(window.SetSignatureText);  // See SigCaptX-SessionControl.js
        }
      }
    }

    /* Take the image generated by RenderBitmap and use it to populate the signature image control on the form */
    function onRenderBitmapFromSigText(sigObjV, bmpObj, status) 
    {
      if(wgssSignatureSDK.ResponseStatus.OK == status) 
      {
        var imageBox = document.getElementById("imageBox");
        if(null == imageBox.firstChild)
        {
          imageBox.appendChild(bmpObj.image);
        }
        else
        {
          imageBox.replaceChild(bmpObj.image, imageBox.firstChild);
        }
      } 
      else 
      {
        print("Signature Render Bitmap error: " + status);
      }
    }
}