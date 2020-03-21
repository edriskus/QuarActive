import React, {
  useState,
  useLayoutEffect,
  useRef,
  PropsWithChildren
} from "react";
import clsx from "clsx";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Box
} from "@material-ui/core";
import { useStyles } from "./ImageCard.styles";

interface Props {
  src: string;
  height?: any;
  overlaid?: boolean;
}

export default function ImageCard({
  src,
  overlaid,
  height = 140,
  children
}: PropsWithChildren<Props>) {
  const imageRef = useRef<HTMLAnchorElement | null>(null);
  const {
    card,
    imageCard,
    imageCardOverlaid,
    imageCardFixed,
    cardContent
  } = useStyles();
  const [fixed, setFixed] = useState(false);
  const [moved, setMoved] = useState(false);
  const [top, setTop] = useState<null | number>(null);

  useLayoutEffect(() => {
    if (overlaid && !fixed) {
      const boundingRect = imageRef?.current?.getBoundingClientRect();
      setTop(boundingRect?.top ?? null);
      setTimeout(() => setFixed(true), 100);
    }
    if (overlaid && fixed && !moved) {
      setMoved(true);
    }
    if (!overlaid && moved) {
      setMoved(false);
    }
    if (!overlaid && !moved && fixed) {
      setTimeout(() => setFixed(false), 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlaid, fixed, moved]);

  return (
    <Card elevation={4} className={card}>
      <CardActionArea ref={imageRef as any}>
        <CardMedia
          image={src}
          style={{
            top: top !== null && !moved ? top : undefined,
            height
          }}
          className={clsx(imageCard, {
            [imageCardFixed]: fixed,
            [imageCardOverlaid]: moved
          })}
        />
        {fixed && <Box height={140} />}
        <CardContent className={cardContent}>{children}</CardContent>
      </CardActionArea>
    </Card>
  );
}
