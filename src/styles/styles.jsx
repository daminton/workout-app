export const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 16,
    width: "100vw",
    height: "100vh",
    overflow: "auto",
    boxSizing: "border-box",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    cursor: "pointer",
  },
  date: {
    fontSize: 20,
    padding: 8,
  },
  workoutContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  workoutInput: {
    flex: 1,
    padding: 8,
    marginRight: 8,
    border: "1px solid #ccc",
    borderRadius: 4,
  },
  saveButton: {
    padding: 8,
    border: "none",
    borderRadius: 4,
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
    marginRight: 8,
  },
  loadSelect: {
    padding: 8,
    border: "1px solid #ccc",
    borderRadius: 4,
  },
  table: {
    marginTop: 16,
    width: "100%",
  },
  tableHeadersWrapper: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-end",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    padding: 8,
  },
  headerGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 2, // Adjust the flex value as needed
  },
  headerSubCell: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 8,
    width: "100%",
  },
  divider: {
    height: "1px",
    width: "100%",
    backgroundColor: "#ccc",
    margin: "4px 0",
  },
  expandHeader: {
    width: "60px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    padding: 8,
    width: "60px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  deleteButton: {
    width: "60px",
    padding: 8,
    border: "none",
    borderRadius: 4,
    backgroundColor: "#d9534f",
    color: "#fff",
    cursor: "pointer",
  },
  historyContainer: {
    marginTop: 16,
  },
  historyTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  historyRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 4,
  },
  historyCell: {
    flex: 1,
    textAlign: "center",
  },
  optionsButtonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
  },
  optionsContainerSaveAndLoad: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  expandingCellsContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 2,
  },
  expandingCell: {
    width: "100%",
    padding: 8,
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  expandButton: {
    width: "60px",
    padding: 8,
    border: "none",
    borderRadius: 4,
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export const mediaStyles = `
@media (max-width: 600px) {
  .dateContainer {
    flex-direction: column;
    align-items: flex-start;
  }
  .date {
    font-size: 18px;
    margin-bottom: 8px;
  }
  .headerCell, .row {
    flex-direction: column;
    align-items: flex-start;
  }
  .cell {
    width: 100%;
    margin-bottom: 8px;
    padding: 8px;
  }
}
`;
