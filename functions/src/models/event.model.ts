export interface Event {
    id: string;
    name: string;
    title: string;
    dateFrom: number;
    dateTo: number;
    imageGridList: string;
    imageOnePageList: string;
    infoPageTitle: string;
    infoPageText: string;
    infoPageHours: string;
    infoPageMinute: string;
    infoPageTimeText: string;
    termsTitle: string;
    termsText: string;
    ordersCount: number;
    price18: number;
    price6: number;
    price0: number;
    beforeTitle: number;
    beforeText: number;
    timer: string;
    runways: Runway[];
    terms: {
        appDeclaration: {title: string, description: string},
        medicalStatement: {title: string, description: string},
        privacyPolicy: {title: string, description: string},
    };
    info: Info[];
}

export interface Runway {
    id: string;
    title: string;
    distance: {value: number, unit: string};
    description: string;
    runwayTime: string;
}

export interface Info {
    time: string;
    description: string;
}
