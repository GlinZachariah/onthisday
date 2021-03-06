// Generated by https://quicktype.io


export interface PageIDResponse {
    batchcomplete: string;
    query: Query;
}

export interface Query {
    pages: {};
}


export interface EventsResponse {
    parse: ParsedEvent;
}

export interface ParsedEvent {
    title: string;
    pageId: number;
    text: TextContent;
}

export interface TextContent {
    [id: string]: string
}



