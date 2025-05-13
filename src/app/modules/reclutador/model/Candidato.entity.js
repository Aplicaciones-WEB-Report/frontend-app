/**
 * Candidate
 * @description Entity to represent a candidate
 */
export class Candidato {
    constructor(name, publicationNumber, cv, posible) {
        this.name = name;
        this.publicationNumber = publicationNumber;
        this.cv = cv;
        this.posible = posible;
        this.status = this.posible === true ? 'Posible' : 'Denegado';
    }

    /**
     * Create a new Candidato instance from a displayableCandidato
     * @param displayableCandidato - The displayable candidate object
     * @returns {Candidato}
     */
    static fromDisplayableCandidato(displayableCandidato) {
        return new Candidato(
            displayableCandidato.name,
            displayableCandidato.publicationNumber,
            displayableCandidato.cv,
            displayableCandidato.status.label === 'Posible'
        );
    }

    /**
     * Convert a Candidato to a displayable format
     * @param candidato - The Candidato instance
     * @returns {{name, publicationNumber, cv, status: (string)}}
     */
    static toDisplayableCandidato(candidato) {
        return {
            name: candidato.name,
            publicationNumber: candidato.publicationNumber,
            cv: candidato.cv,
            status: candidato.posible === true ? 'Posible' : 'Denegado'
        };
    }
}
