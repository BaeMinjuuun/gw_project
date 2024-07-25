import React from "react";
import DaumPostcode from "react-daum-postcode";

const DaumPostCode = ({ onComplete }) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onComplete(fullAddress);
  };

  return <DaumPostcode onComplete={handleComplete} />;
};

export default DaumPostCode;
