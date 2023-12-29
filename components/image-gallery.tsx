"use client";
import ModalImage from "react-modal-image";

const ImageGallery = ({ images }: any) => {
  const imgArray = Object.values(images).map((img: any) => ({
    src: img,
    width: 100,
    height: 100,
  }));
  console.log("imgArray: ", imgArray);

  return (
    <div className="fle-wrap flex py-4">
      {imgArray.map((img: any, index: number) => {
        if (!img.src) return "";
        return (
          <div
            className="flex items-center justify-center p-1"
            key={`image_${index}`}
          >
            <ModalImage
              small={img.src}
              large={img.src}
              // alt="brownstone location image"
              className="max-h-[300px] w-[160px] rounded-lg"
            />
            {/* <img
              src={img.src}
              alt="brownstone location image"
              className="rounded-lg"
              style={{
                backgroundImage: `url(${img.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "100px", // adjust as needed
                width: "100px", // adjust as needed
              }}
            /> */}
          </div>
        );
      })}
    </div>
  );
};

export default ImageGallery;
