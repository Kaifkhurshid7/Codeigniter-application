export default function DataTable({ title, columns, rows, emptyMessage }) {
  return (
    <section className="glass-panel table-container">
      <div style={{ padding: '24px' }}>
        <h3>{title}</h3>
        <p className="sidebar-copy">{rows.length} records</p>
      </div>

      {rows.length === 0 ? (
        <div className="empty-state">{emptyMessage}</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id ?? `${title}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.key}>{row[column.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
