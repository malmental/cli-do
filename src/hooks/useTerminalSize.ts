import { useEffect, useState } from "react";
import { useStdout } from "ink";

export function useTerminalSize() {
  const { stdout } = useStdout();
  const [size, setSize] = useState({
    columns: stdout.columns ?? 80,
    rows: stdout.rows ?? 24,
  });

  useEffect(() => {
    const updateSize = () => {
      setSize({
        columns: stdout.columns ?? 80,
        rows: stdout.rows ?? 24,
      });
    };

    updateSize();
    stdout.on("resize", updateSize);
    return () => {
      stdout.off("resize", updateSize);
    };
  }, [stdout]);

  return size;
}
