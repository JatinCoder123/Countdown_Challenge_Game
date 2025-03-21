import { useRef, useImperativeHandle } from "react";
export default function ResultModal({
  ref,
  remainingTime,
  onReset,
  targetTime,
}) {
 
  const dialog = useRef();
  const result = remainingTime <= 0;
  const formattedTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return (
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {result && <h2>You Lost</h2>}
      {!result && <h2>Your Score:{score}</h2>}
      <p>
        The target time was <strong>{targetTime}</strong> second
      </p>
      <p>
        You stop timer with <strong>{formattedTime} Seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
}
