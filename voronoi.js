var VoronoiDemo = {
    voronoi: new Voronoi(),
    sites: [],
    diagram: null,
    margin: 0.0,
    canvas: null,
    bbox: {xl:0,xr:3508,yt:0,yb:2480},

    init: function() {
        this.canvas = document.getElementById('voronoiCanvas');
        this.randomSites(2000,true);
        this.render();
        },

    clearSites: function() {
        this.sites = [];
        this.diagram = this.voronoi.compute(this.sites, this.bbox);
        },

    randomSites: function(n,clear) {
        if (clear) {this.sites = [];}
        // create vertices
        var xmargin = this.canvas.width*this.margin,
            ymargin = this.canvas.height*this.margin,
            xo = xmargin,
            dx = this.canvas.width-xmargin*2,
            yo = ymargin,
            dy = this.canvas.height-ymargin*2;
        for (var i=0; i<n; i++) {
            this.sites.push({
                x: xo + Math.random()*dx + Math.random()/dx,
                y: yo + Math.random()*dy + Math.random()/dy
                });
            }
        this.voronoi.recycle(this.diagram);
        this.diagram = this.voronoi.compute(this.sites, this.bbox);
        },

    recompute: function() {
        this.diagram = this.voronoi.compute(this.sites, this.bbox);
        },

    render: function() {
        var ctx = this.canvas.getContext('2d');
        // background
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.rect(0,0,this.canvas.width,this.canvas.height);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = '#888';
        ctx.stroke();
        // voronoi
        if (!this.diagram) {return;}
        // edges
        ctx.beginPath();
        ctx.strokeStyle = '#000';
        var edges = this.diagram.edges,
            iEdge = edges.length,
            edge, v;
        while (iEdge--) {
            edge = edges[iEdge];
            v = edge.va;
            ctx.moveTo(v.x,v.y);
            v = edge.vb;
            ctx.lineTo(v.x,v.y);
            }
        ctx.stroke();
        // edges
        ctx.beginPath();
        ctx.fillStyle = '#000';
        var vertices = this.diagram.vertices,
            iVertex = vertices.length;
        while (iVertex--) {
            v = vertices[iVertex];
            ctx.rect(v.x,v.y,1,1);
            }
        ctx.fill();
        // sites
        ctx.beginPath();
        ctx.fillStyle = 'white';
        var sites = this.sites,
            iSite = sites.length;
        while (iSite--) {
            v = sites[iSite];
            ctx.rect(v.x-2/3,v.y-2/3,2,2);
            }
        ctx.fill();
        },
    };