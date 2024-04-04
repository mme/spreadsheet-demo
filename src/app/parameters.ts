export const SPREADSHEET_PARAMS = [
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
];
