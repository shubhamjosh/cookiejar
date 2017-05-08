$.plot($("#condition-chart"), datax,
    {
        series: {
            pie: {
                innerRadius: 0.7,
                show: true
            }
        },
        grid: {
            hoverable: true
        },
        legend: {
            show: true,

        },
        tooltip: true,
        tooltipOpts: {
            content: "%p.0%, %s"
        }

    });
$("#condition-chart").bind("plothover", pieHover);



function pieHover(event, pos, obj) {
    if (!obj)
        return;
    percent = parseFloat(obj.series.percent).toFixed(2);
    $("#hover").html('<span style="font-weight: bold; color: ' + obj.series.color + '">' + obj.series.label + ' (' + percent + '%)</span>');
}