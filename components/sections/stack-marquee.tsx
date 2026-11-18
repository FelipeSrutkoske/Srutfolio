const items = [
  "GO (GOLANG) PRIORITY",
  "MICROSERVICES & NGINX",
  "NODE.JS & NESTJS",
  "NEXT.JS & REACT NATIVE",
  "POSTGRESQL / ORACLE / MYSQL",
  "LINUX SSH & DOCKER",
  "CLEAN ARCHITECTURE",
];

export default function StackMarquee() {
  const repeated = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-b border-rule-strong bg-ink py-3 text-paper"
    >
      <div className="animate-marquee items-center gap-8 font-mono text-xs uppercase tracking-[0.2em]">
        {repeated.map((item, idx) => (
          <span key={`${item}-${idx}`} className="flex items-center gap-8 whitespace-nowrap">
            <span className={item.includes("GOLANG") ? "font-bold text-mustard" : ""}>
              {item}
            </span>
            <span className="text-mustard">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
