'use strict';
/**
 エリア(ごみ処理の地域）を管理するクラスです。
 */
var AreaModel;
AreaModel = (function () {
    function AreaModel(row) {
        this.mastercode = row[0];
        this.name = row[1];
        this.centerName = row[2];
        this.center = null;
        this.trash = [];
    }

    /**
     各ゴミのカテゴリに対して、最も直近の日付を計算します。
     */
    AreaModel.prototype.calcMostRect = function calcMostRect() {
        var that = this;
        this.trash.forEach(function (trash) {
            trash.calcMostRect(that);
        });
    };
    /**
     休止期間（主に年末年始）かどうかを判定します。
     */
    AreaModel.prototype.isBlankDay = function isBlankDay(currentDate) {
        var period = [this.center.startDate, this.center.endDate];

        return !!(period[0].getTime() <= currentDate.getTime() &&
        currentDate.getTime() <= period[1].getTime());

    };
    /**
     ゴミ処理センターを登録します。
     名前が一致するかどうかで判定を行っております。
     */
    AreaModel.prototype.setCenter = function setCenter(center_data) {
        var that = this;
        center_data.forEach(function (center) {
            if (that.centerName == center.name) {
                that.center = center;
            }
        });
    };
    /**
     ゴミのカテゴリのソートを行います。
     */
    AreaModel.prototype.sortTrash = function sortTrash() {
        this.trash.sort(function (a, b) {
            var at = a.mostRecent.getTime();
            var bt = b.mostRecent.getTime();
            if (at < bt) return -1;
            if (at > bt) return 1;
            return 0;
        });
    };

    return AreaModel;
})();

AreaModel.readCSV = function (mastercode, remarks, func) {
    $.get(AreaCSVFileName, function(data){
        var csv_array = Utility.csvToArray(data);
        var ret = [],
            area_label = csv_array.shift();
        csv_array.forEach(function (row) {
            var area = new AreaModel(row);
            if (area.mastercode == mastercode) {
                ret.push(area);
                for (var r = 3; r < 3 + MaxDescription; r++) {
                    if (area_label[r]) {
                        var trash = new TrashModel(area_label[r], row[r], remarks);
                        area.trash.push(trash);
                    }
                }
            }
        });
        func(ret);
    });
};