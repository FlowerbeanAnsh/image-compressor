import { useState } from "react";
import Resizer from "react-image-file-resizer";

const ImageCompressor = () =>{
    const [image, setImage] = useState(null)
    const [originalSize,setOriginalSize] = useState(null);
    const [compressedSize,setCompressedSize] = useState(null);
    console.log(image);
    const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,  // file name
      1000,   // max height
      1000,     // max width
      "webp",   // output ext.
    80,           // quality out of 100
      0,          // rotation
      (uri) => {
        resolve(uri);
      },
      "file"    // outputType
    );
  });
    const onImageChange = async (event) => {
     if (event.target.files && event.target.files[0]) {
       const file = event.target.files[0];
       console.log(file.size/1024,"size");
       setOriginalSize(file.size/1024);
      const image = await resizeFile(file);
      setCompressedSize(image.size/1024);
      console.log(image.size/1024,"size");
       setImage(URL.createObjectURL(image));
     }
    }
return(
    <div>
        <h1>Upload a file</h1><br></br>
        <input type="file" onChange={onImageChange} className="filetype" /><br></br><br></br>
    <img alt="preview image" src={image} height="400" width="500"/>
    <h2 style={{color:"red"}}>Size before compression: {originalSize} KB</h2>
    <h2 style={{color:"green"}}>Size after compression: {compressedSize} KB</h2>
    </div>
)
}

export default ImageCompressor;