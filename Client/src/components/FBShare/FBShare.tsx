import React from "react";

interface Props {
  link: string;
}

export default function FBShare({ link }: Props) {
  return (
    <iframe
      title="FB Share Button"
      src={`https://www.facebook.com/plugins/share_button.php?href=${encodeURI(
        link
      )}&layout=button&size=large&appId=597630954299602&width=90&height=28`}
      width="90"
      height="28"
      style={{ border: "none", overflow: "hidden" }}
      scrolling="no"
      allow="encrypted-media"
    />
  );
}
