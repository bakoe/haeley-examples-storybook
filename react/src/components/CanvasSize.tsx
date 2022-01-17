import React, { PropsWithChildren } from "react";

import { CanvasSizeExample } from "../../../source/CanvasSize/canvassize-example";
import { Example } from "../../../source/example";

import classes from "../../../source/styles/webgloperate.module.css";

interface CanvasSizeProps {
  cellWidthDenominator?: number;
}

export const CanvasSize: React.FC<CanvasSizeProps> = ({
  cellWidthDenominator = 64,
  ...props
}: PropsWithChildren<CanvasSizeProps>) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const spinnerRef = React.useRef<HTMLDivElement | null>(null);
  const [example, setExample] = React.useState<Example | undefined>(undefined);

  React.useEffect(() => {
    if (example) {
      (example as CanvasSizeExample).cellWidth = 1.0 / cellWidthDenominator!;
    }
  }, [example, cellWidthDenominator]);

  React.useEffect(() => {
    if (canvasRef.current) {
      const exampleInstance = new CanvasSizeExample();

      exampleInstance.initialize(
        canvasRef.current,
        spinnerRef.current || undefined
      );

      (exampleInstance as CanvasSizeExample).cellWidth =
        1.0 / cellWidthDenominator!;

      setExample(exampleInstance);
    }

    return () => {
      if (example) {
        example.uninitialize();
      }
    };
  }, []);

  return (
    <>
      <canvas className={classes.canvas} ref={canvasRef} />
      <div className={classes.spinner} ref={spinnerRef}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {props.children}
    </>
  );
};
