/**
 * Edge
 */
export class Edge {
  // !!! IMPLEMENT ME
  constructor(destination) {
    this.destination = destination;
  }
}

/**
 * Vertex
 */
export class Vertex {
  // !!! IMPLEMENT ME
  constructor(value = 'default', pos = { x: -1, y: -1 }) {
    this.edges = [];
    this.value = value;
    this.pos = pos;
    this.color = 'white';
  }
}

/**
 * Graph
 */
export class Graph {
  constructor() {
    console.log('called graph contructor');
    this.vertexes = [];
  }

  // debugCreateTestData() {
  //   console.log('called debugCreateTestData');
  //   // let debugVertex1 = new Vertex('t1', { x: 40, y: 40 });
  //   // let debugVertex2 = new Vertex('t2', { x: 80, y: 80 });
  //   // let debugVertex3 = new Vertex('t3', { x: 120, y: 120 });

  //   let debugEdge1 = new Edge(debugVertex2); // vertex1 to 2
  //   debugVertex1.edges.push(debugEdge1);

  //   // console.log('1st edge is ', );

  //   let debugEdge2 = new Edge(debugVertex3);
  //   debugVertex2.edges.push(debugEdge2);

  //   this.vertexes.push(debugVertex1, debugVertex2, debugVertex3);
  // }

  /**
   * Create a random graph
   */
  randomize(width, height, pxBox, probability = 0.6) {
    // Helper function to set up two-way edges
    function connectVerts(v0, v1) {
      v0.edges.push(new Edge(v1));
      v1.edges.push(new Edge(v0));
    }

    let count = 0;

    // Build a grid of verts
    let grid = [];
    for (let y = 0; y < height; y++) {
      let row = [];
      for (let x = 0; x < width; x++) {
        let v = new Vertex();
        //v.value = 'v' + x + ',' + y;
        v.value = 'v' + count++;
        row.push(v);
      }
      grid.push(row);
    }

    // Go through the grid randomly hooking up edges
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Connect down
        if (y < height - 1) {
          if (Math.random() < probability) {
            connectVerts(grid[y][x], grid[y + 1][x]);
          }
        }

        // Connect right
        if (x < width - 1) {
          if (Math.random() < probability) {
            connectVerts(grid[y][x], grid[y][x + 1]);
          }
        }
      }
    }

    // Last pass, set the x and y coordinates for drawing
    const boxBuffer = 0.8;
    const boxInner = pxBox * boxBuffer;
    const boxInnerOffset = (pxBox - boxInner) / 2;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        grid[y][x].pos = {
          x: (x * pxBox + boxInnerOffset + Math.random() * boxInner) | 0,
          y: (y * pxBox + boxInnerOffset + Math.random() * boxInner) | 0
        };
      }
    }

    // Finally, add everything in our grid to the vertexes in this Graph
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.vertexes.push(grid[y][x]);
      }
    }
  }

  /**
   * Dump graph data to the console
   */
  dump() {
    let s;

    for (let v of this.vertexes) {
      if (v.pos) {
        s = v.value + ' (' + v.pos.x + ',' + v.pos.y + '):';
      } else {
        s = v.value + ':';
      }

      for (let e of v.edges) {
        s += ` ${e.destination.value}`;
      }
      console.log(s);
    }
  }
  // random color generator ****
  getRandomColor() {
    let letters = '0123456789ABCDEF';

    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /**
   * BFS
   */
  bfs(start) {
    // !!! IMPLEMENT ME
    /** > Pick color
     * 1. choose first vertex in graph.vertexes and add to found and queue array.
     *     color vertex
     
     *  While loop {
     *   2. for each edge in (first vertex) edge array, if destination is not in found:
     *     > add to found list
     *     > add to end of queue
     *   3. Dequeue queue[0 or first vertex]
     *   4. if queue is not empty Repeat step 2.
     *  }
     */
    // const queue = [start];
    // const found = [];
    // let current;

    // console.log(this.vertexes);
    // while (queue.length > 0) {
    //   current = queue.shift();

    //   console.log('for edges', current);
    //   for (let i = 0; i < this.vertexes.length; i++) {
    //     if (this.vertexes[current].color === 'white') {
    //       this.vertexes[current].color === paint;
    //     }
    //   }
    // }
    const paint = this.getRandomColor();

    // lecture solution**********
    // create a found and queue list
    let found = [];
    let queue = [];

    // add start to found list
    found.push(start);

    // add start to queue list
    queue.push(start);
    // add random color
    start.color = paint;

    // if queue is not empty
    while (queue.lenth > 0) {
      const v = queue.shift();
      for (let edge of v.edges) {
        if (!found.includes(edge.destination)) {
          // add to found list
          found.push(edge.destination);
          // add to queue
          queue.push(edge.destination);

          edge.destination.color = paint;
        }
      }
      queue.shift();
    }
    return found;
  }

  /**
   * Get the connected components
   */
  getConnectedComponents() {
    // !!! IMPLEMENT ME
    /**
     * 1. Go to next unfound vertex in graph.vertexes and call BFS
     * 2. Repeat until end of array
     */
    let searched = [];

    for (let vertex of this.vertexes) {
      if (!searched.includes(vertex)) {
        searched = searched.concat(this.bfs(vertex));
      }
    }
  }
}
