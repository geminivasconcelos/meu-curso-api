export class InstitutionListDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly acronym: string,
    readonly courses: Array<any>
  ) {}
}
