//Prints canvas to pdf

const buttonPrint = document.querySelector('#print');

buttonPrint.addEventListener('click', printPDF);

function printPDF() {
    var canvas = document.getElementById('voronoiCanvas');
    var imgData = canvas.toDataURL('image/png');
    var doc = new jsPDF({
        orientation: "landscape",
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true,
      });
    var width = doc.internal.pageSize.width;
    var height = doc.internal.pageSize.height;
    doc.addImage(imgData, 'PNG', 0, 0, width, height);
    doc.save('voronoi.pdf');

}
