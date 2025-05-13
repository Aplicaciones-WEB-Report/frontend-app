export class Candidato {
    constructor(id, name, publicationNumber, cv, posible) {
        this.id = id;
        this.name = name;
        this.publicationNumber = publicationNumber;
        this.cv = cv;
        this.posible = posible;
        this.status = this.posible === true ? 'Posible' : 'Denegado';
    }

    static fromDisplayableCandidato(displayableCandidato) {
        return new Candidato(
            displayableCandidato.id,
            displayableCandidato.name,
            displayableCandidato.publicationNumber,
            displayableCandidato.cv,
            displayableCandidato.status.label === 'Posible'
        );
    }

    static toDisplayableCandidato(candidato) {
        return {
            id: candidato.id,
            name: candidato.name,
            publicationNumber: candidato.publicationNumber,
            cv: candidato.cv,
            status: candidato.posible === true ? 'Posible' : 'Denegado',
            posible: candidato.posible
        };
    }
}
