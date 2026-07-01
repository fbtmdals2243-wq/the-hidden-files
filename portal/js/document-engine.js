function renderMinistryDocument({
  seal = "BRITISH MINISTRY OF MAGIC",
  title = "Official Document",
  subtitle = "",
  classification = "Level I",
  department = "Archive Division",
  status = "Reviewed",
  body = "",
  footer = "MINISTRY RECORD · ARCHIVE COPY"
}) {
  return `
    <div class="ministry-document">
      <div class="doc-seal">${seal}</div>

      <div class="doc-header">
        <h2>${title}</h2>
        <p>${subtitle}</p>
      </div>

      <div class="doc-meta">
        <p><b>Classification</b><span>${classification}</span></p>
        <p><b>Department</b><span>${department}</span></p>
        <p><b>Status</b><span>${status}</span></p>
      </div>

      <pre class="doc-body">${body}</pre>

      <div class="doc-footer">${footer}</div>
    </div>
  `;
}