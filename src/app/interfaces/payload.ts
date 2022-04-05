import { Vertex } from '@interfaces/vertex';
import { Edge } from '@interfaces/edge';

export interface Payload {
    vertices: Array<Vertex>;
    edges: Array<Edge>;
}
