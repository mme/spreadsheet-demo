import {
  useCopilotAction,
  useMakeCopilotReadable,
} from "@copilotkit/react-core";
import React from "react";
import Spreadsheet from "react-spreadsheet";

interface MainAreaProps {
  spreadsheet: Spreadsheet;
  setSpreadsheet: (spreadsheet: Spreadsheet) => void;
}

const MainArea = ({ spreadsheet, setSpreadsheet }: MainAreaProps) => {
  useMakeCopilotReadable(
    "This is the current spreadsheet: " + JSON.stringify(spreadsheet)
  );

  useCopilotAction({
    name: "updateSpreadsheet",
    description: "Update the current spreadsheet",
    parameters: [
      {
        name: "rows",
        type: "object[]",
        description: "The rows of the spreadsheet",
        attributes: [
          {
            name: "columns",
            type: "object[]",
            description: "The columns of the row",
            attributes: [
              {
                name: "value",
                type: "string",
                description: "The value of the cell",
              },
            ],
          },
        ],
      },
      {
        name: "title",
        type: "string",
        description: "The title of the spreadsheet",
        required: false,
      },
    ],
    render: "Updating spreadsheet...",
    handler: ({ rows, title }) => {
      const data: Row[] = [];
      for (const row of rows || []) {
        const columns: Cell[] = [];
        for (const column of row.columns) {
          columns.push({ value: column.value });
        }
        data.push(columns);
      }
      const updatedSpreadsheet: Spreadsheet = {
        title: title || spreadsheet.title,
        data,
      };
      setSpreadsheet(updatedSpreadsheet);
    },
  });

  useCopilotAction({
    name: "appendToSpreadsheet",
    description: "Append rows to the current spreadsheet",
    parameters: [
      {
        name: "rows",
        type: "object[]",
        description: "The new rows of the spreadsheet",
        attributes: [
          {
            name: "columns",
            type: "object[]",
            description: "The columns of the row",
            attributes: [
              {
                name: "value",
                type: "string",
                description: "The value of the cell",
              },
            ],
          },
        ],
      },
      {
        name: "title",
        type: "string",
        description: "The title of the spreadsheet",
        required: false,
      },
    ],
    render: "Updating spreadsheet...",
    handler: ({ rows, title }) => {
      const data: Row[] = [];
      for (const row of rows || []) {
        const columns: Cell[] = [];
        for (const column of row.columns) {
          columns.push({ value: column.value });
        }
        data.push(columns);
      }
      const updatedSpreadsheet: Spreadsheet = {
        title: title || spreadsheet.title,
        data: [...spreadsheet.data, ...data],
      };
      setSpreadsheet(updatedSpreadsheet);
    },
  });

  return (
    <div className="flex-1 overflow-auto p-5">
      <input
        type="text"
        value={spreadsheet.title}
        className="w-full p-2 mb-5 text-center text-2xl font-bold outline-none bg-transparent"
        onChange={(e) =>
          setSpreadsheet({ ...spreadsheet, title: e.target.value })
        }
      />
      <div className="flex items-start">
        <Spreadsheet
          data={spreadsheet.data}
          onChange={(data) => {
            console.log("data", data);
            setSpreadsheet({ ...spreadsheet, data: data as any });
          }}
        />
        <button
          className="bg-blue-500 text-white rounded-lg ml-6 w-8 h-8 mt-0.5"
          onClick={() => {
            const spreadsheetData = [...spreadsheet.data];
            for (let i = 0; i < spreadsheet.data.length; i++) {
              spreadsheet.data[i].push({ value: "" });
            }
            setSpreadsheet({
              ...spreadsheet,
              data: spreadsheetData,
            });
          }}
        >
          +
        </button>
      </div>
      <button
        className="bg-blue-500 text-white rounded-lg w-8 h-8 mt-5 "
        onClick={() => {
          const numberOfColumns = spreadsheet.data[0].length;
          const newRow: Row = [];
          for (let i = 0; i < numberOfColumns; i++) {
            newRow.push({ value: "" });
          }
          setSpreadsheet({
            ...spreadsheet,
            data: [...spreadsheet.data, newRow],
          });
        }}
      >
        +
      </button>
    </div>
  );
};

export default MainArea;
