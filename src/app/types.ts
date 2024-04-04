interface Cell {
  value: string;
}

type Row = Cell[];

interface Spreadsheet {
  title: string;
  data: Row[];
}
