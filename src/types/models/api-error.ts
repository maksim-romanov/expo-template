export class APIError extends Error {
  status: number;
  field: object;

  constructor(props: { status: number; message: string; field?: object }) {
    super(props.message);
    this.name = "API Error";

    this.status = props.status;
    this.field = props.field || {};
  }
}
