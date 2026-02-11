import React from "react";
import DOMPurify from "dompurify";

export function DisplayHtml({
  content,
}: {
  content: string;
}): React.JSX.Element {
  const sanitizedHtmlContent = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }} />;
}
