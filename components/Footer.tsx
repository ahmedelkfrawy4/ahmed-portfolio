import VariableProximity from "./VariableProximity";

const links = {
  contact: [
    { label: "Email", href: "mailto:info@ahmedelkfrawy.com" },
    { label: "Phone", href: "tel:+201093839772" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmedelkfrawy" },
  ],
  sections: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Toolbelt", href: "#toolbelt" },
    { label: "Contact", href: "#contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-plum)] text-[var(--color-cream)] px-5 md:px-8 py-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="mono text-[var(--color-ochre)] mb-4">Get in touch</div>
            <ul className="space-y-2 text-sm">
              {links.contact.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="link-underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mono text-[var(--color-ochre)] mb-4">Jump to</div>
            <ul className="space-y-2 text-sm">
              {links.sections.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="link-underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 md:text-right">
            <div className="display text-5xl md:text-7xl italic">
              Ahmed Elkfrawy
            </div>
            <p className="mono mt-2 text-[var(--color-cream)]/70">
              UI/UX designer · Cairo, Egypt
            </p>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="display text-[clamp(5rem,22vw,22rem)] leading-[0.85] -mb-6 opacity-90">
          <VariableProximity label="elkfrawy" />
          <span className="italic text-[var(--color-ochre)]">.</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-[var(--color-cream)]/10 text-xs text-[var(--color-cream)]/60">
          <div>© {new Date().getFullYear()} Ahmed Elkfrawy. Designed with love in Cairo.</div>
          <div>Type set in Fraunces, Inter, and Caveat.</div>
        </div>
      </div>
    </footer>
  );
}
