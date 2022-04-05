import { Component, ElementRef, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';

import { Payload } from '@interfaces/payload';
import { Vertex } from '@interfaces/vertex';
import { VertexPosition } from '@interfaces/vertex-position';
import { Edge } from '@interfaces/edge';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() payload?: Payload;

  @ViewChild('chartCanvas')
  chartCanvas: ElementRef = {} as ElementRef;
  ctx: any;

  graphHeight: number = 400;
  graphWidth: number = 400;

  vertexPositions: Array<VertexPosition> = [];

  imageNode = new Image();
  imageAlarm = new Image();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.preloadImages();
    this.renderGraph();
  }

  /**
   * Preload all images prior to being rendered for Vertex
   */
  preloadImages() {
    this.imageNode.src = '/assets/img/circle.png';
    this.imageAlarm.src = '/assets/img/exclamation-triangle.png';
  }

  ngOnChanges(changes: SimpleChanges) {
    this.renderPayload();
  }

  renderGraph() {
    this.ctx = this.chartCanvas.nativeElement.getContext("2d");
    this.drawContainer();
  }

  drawContainer() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, this.graphHeight);
    this.ctx.lineTo(this.graphWidth, this.graphHeight);
    this.ctx.lineTo(this.graphWidth, 0);
    this.ctx.lineTo(0, 0);
    this.ctx.stroke();
  }

  /**
   * If payload exists render Verticies and Edges
   * Will run evertime payload updates
   */
  renderPayload() {
    if(this.payload){
      this.resetCanvas();
      this.payload.vertices.forEach(vertex => {
        this.plotVertex(vertex);
      });
      this.payload.edges.forEach(edge => {
        this.plotEdge(edge);
      });
    }
  }

  /**
   * Remove all Vertices and Edges from Canvas
   */
  resetCanvas() {
    this.vertexPositions = [];
    this.ctx.clearRect(0, 0, this.graphWidth, this.graphHeight);
    this.drawContainer();
  }

  /**
   * Add all Vertices to Canvas
   * @param {Vertex} vertex - Vertex from Vertex Array in Payload
   */
  plotVertex(vertex: Vertex) {
    // Randomise Vertex Position
    const vertexPositionX = this.randomPosition(100, this.graphWidth - 100);
    const vertexPositionY = this.randomPosition(100, this.graphHeight - 100);
    
    // Draw Image at Vertex position
    const image = this.getImage(vertex.type);
    this.ctx.drawImage(image, vertexPositionX - 8, vertexPositionY - 8);

    // Save Randomised Vertex Position
    const savedVertexPosition: VertexPosition = {id: vertex.id, posX: vertexPositionX, posY: vertexPositionY};
    this.vertexPositions.push(savedVertexPosition);
  }

  /**
   * Get image type based on Vertex type
   * @param {string} type 
   * @returns {Image}
   */
  getImage(type: string) {
    let image = new Image();

    switch (type) {
      case 'node':
        image = this.imageNode;
        break;
      case 'alarm':
        image = this.imageAlarm;
        break;
      default:
        image = this.imageNode;
        break;
    }
    
    return image;
  }

  /**
   * Plot all edges using start and end point from saved randomised vertex position
   * @param {Edge} edge 
   */
  plotEdge(edge: Edge) {
    const sourceVertex = this.vertexPositions.find(vertex => vertex.id === edge.source_id);
    const targetVertex = this.vertexPositions.find(vertex => vertex.id === edge.target_id);
    this.ctx.beginPath();
    this.ctx.lineTo(sourceVertex?.posX, sourceVertex?.posY);
    this.ctx.lineTo(targetVertex?.posX, targetVertex?.posY);
    this.ctx.stroke();
  }

  /**
   * Generate random position for Vertex
   * @param {number} min
   * @param {number} max 
   * @returns {number} - position within min max
   */
  randomPosition(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }

}
