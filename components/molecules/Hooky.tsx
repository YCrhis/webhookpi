export default function Hooky() {
  return (
    <svg
      viewBox="0 0 128 128"
      role="img"
      aria-label="Hooky the pixel cat"
      className="h-full w-full"
      shapeRendering="crispEdges"
    >
      {/* Tail */}
      <g stroke="#0B090B" strokeWidth="4">
        <rect x="18" y="83" width="16" height="20" fill="#F28B36" />
        <rect x="10" y="75" width="16" height="16" fill="#F28B36" />
        <rect x="18" y="67" width="16" height="16" fill="#F28B36" />
        <rect x="26" y="75" width="16" height="16" fill="#F28B36" />
        <rect x="34" y="83" width="12" height="16" fill="#F28B36" />
      </g>

      {/* Ears */}
      <g stroke="#0B090B" strokeWidth="4">
        <path
          d="M30 48V18H46V30H58V42H70V30H82V18H98V48Z"
          fill="#30242F"
        />
        <path
          d="M38 38V26H46V34H54V42H46V38Z"
          fill="#F28B36"
        />
        <path
          d="M74 42V34H82V26H90V38H82V42Z"
          fill="#F28B36"
        />
      </g>

      {/* Head */}
      <path
        d="M26 42H38V34H90V42H102V82H94V90H82V98H46V90H34V82H26Z"
        fill="#30242F"
        stroke="#0B090B"
        strokeWidth="4"
      />

      {/* Face */}
      <g fill="#F5F2F5">
        <rect x="38" y="54" width="16" height="12" />
        <rect x="74" y="54" width="16" height="12" />
        <rect x="46" y="66" width="36" height="12" />
      </g>

      {/* Eyes */}
      <g fill="#0B090B">
        <rect x="42" y="54" width="8" height="12" />
        <rect x="78" y="54" width="8" height="12" />
      </g>

      {/* Nose and mouth */}
      <g fill="#F28B36">
        <rect x="58" y="70" width="12" height="8" />
        <rect x="62" y="78" width="4" height="8" />
        <rect x="54" y="82" width="8" height="4" />
        <rect x="66" y="82" width="8" height="4" />
      </g>

      {/* Whiskers */}
      <g fill="#969099">
        <rect x="18" y="66" width="16" height="4" />
        <rect x="18" y="74" width="12" height="4" />
        <rect x="94" y="66" width="16" height="4" />
        <rect x="98" y="74" width="12" height="4" />
      </g>

      {/* Hoodie */}
      <path
        d="M34 94H46V90H82V94H94V116H82V120H46V116H34Z"
        fill="#1B171B"
        stroke="#0B090B"
        strokeWidth="4"
      />

      {/* Hoodie pocket */}
      <rect x="50" y="102" width="28" height="12" fill="#3A2417" />
      <rect x="58" y="98" width="12" height="4" fill="#F28B36" />

      {/* Webhook logo */}
      <g
        fill="none"
        stroke="#F28B36"
        strokeWidth="4"
        strokeLinecap="square"
      >
        <path d="M64 102L56 110H48" />
        <path d="M64 102L72 110H80" />
        <path d="M64 102V94" />
      </g>

      {/* Paws */}
      <g fill="#F5F2F5">
        <rect x="38" y="116" width="20" height="8" />
        <rect x="70" y="116" width="20" height="8" />
      </g>
    </svg>
  );
}