export interface HistorialMedico {
    _id?: string;
    paciente: string;
    tratamientoMedicoActual: {
        enTratamiento: boolean;
        tiempo?: string | null;
    };
    usoMedicamento: {
        usaMedicamento: boolean;
        cuales?: string | null;
    };
    enfermedades: {
        tuberculosis?: boolean;
        lepra?: boolean;
        enfermedadesSexuales?: boolean;
        hepatitis?: boolean;
        sida?: boolean;
        enfermedadChagas?: boolean;
        fiebreReumatica?: boolean;
        asma?: boolean;
        sinusitis?: boolean;
        alergia?: boolean;
        ulceras?: boolean;
        enfermedadesCardiacas?: boolean;
        epilepsia?: boolean;
        hipertensionArterial?: boolean;
        anemia?: boolean;
        hemofilia?: boolean;
        disturbiosPsiquicos?: boolean;
        convulsiones?: boolean;
        desmayos?: boolean;
        problemasCoagulacion?: boolean;
        diabetes?: boolean;
        otras?: string | null;
    };
    transfusionSanguinea: {
        necesitaTransfusion: boolean;
        motivo?: string | null;
    };
    cirugiasPrevias: {
        fueSometido: boolean;
        detalle?: string | null;
    };
    sangradoProlongado: boolean;
    fuma: {
        fuma: boolean;
        tiempo?: string | null;
    };
    alcohol: {
        bebeAlcohol: boolean;
        tiempo?: string | null;
    };
    embarazo: boolean;
    toleranciaAnestesia: boolean;
    testElisa: {
        seRealizo: boolean;
        tiempo?: string | null;
    };
    motivoVisita: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CrearHistorialRequest {
    paciente: string;
    tratamientoMedicoActual: {
        enTratamiento: boolean;
        tiempo?: string | null;
    };
    usoMedicamento: {
        usaMedicamento: boolean;
        cuales?: string | null;
    };
    enfermedades: {
        tuberculosis?: boolean;
        lepra?: boolean;
        enfermedadesSexuales?: boolean;
        hepatitis?: boolean;
        sida?: boolean;
        enfermedadChagas?: boolean;
        fiebreReumatica?: boolean;
        asma?: boolean;
        sinusitis?: boolean;
        alergia?: boolean;
        ulceras?: boolean;
        enfermedadesCardiacas?: boolean;
        epilepsia?: boolean;
        hipertensionArterial?: boolean;
        anemia?: boolean;
        hemofilia?: boolean;
        disturbiosPsiquicos?: boolean;
        convulsiones?: boolean;
        desmayos?: boolean;
        problemasCoagulacion?: boolean;
        diabetes?: boolean;
        otras?: string | null;
    };
    transfusionSanguinea: {
        necesitaTransfusion: boolean;
        motivo?: string | null;
    };
    cirugiasPrevias: {
        fueSometido: boolean;
        detalle?: string | null;
    };
    sangradoProlongado: boolean;
    fuma: {
        fuma: boolean;
        tiempo?: string | null;
    };
    alcohol: {
        bebeAlcohol: boolean;
        tiempo?: string | null;
    };
    embarazo: boolean;
    toleranciaAnestesia: boolean;
    testElisa: {
        seRealizo: boolean;
        tiempo?: string | null;
    };
    motivoVisita: string;
}
