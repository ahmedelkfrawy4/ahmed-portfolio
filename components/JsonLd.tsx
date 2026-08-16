// Renders a JSON-LD structured-data block. Search engines read this to
// understand who the page is about and how it relates to other pages —
// it powers rich results and helps Google tie the name to a person entity.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Content is our own static data, not user input — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
