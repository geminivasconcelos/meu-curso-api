export class InstitutionListDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly cursos: Array<any>
  ) {}
}
