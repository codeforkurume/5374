/**
 エリアマスターを管理するクラスです。
 area_master.csvのモデルです。
 */
var AreaMasterModel;
AreaMasterModel = (function () {
    function AreaMasterModel(row) {
        this.mastercode = row[0];
        this.name = row[1];
    }

    AreaMasterModel.prototype.getId = function () {
        return this.mastercode;
    };

    return AreaMasterModel;
})();

AreaMasterModel.readCSV = function (func) {
    $.get(AreaMasterCSVFileName, function (data) {
        var ret = [];
        var csv_array = Utility.csvToArray(data);
        var area_master_label = csv_array.shift();
        csv_array.forEach(function (row) {
            var area_master = new AreaMasterModel(row);
            ret.push(area_master);
        });
        func(ret);
    });
};

AreaMasterModel.getMasterCodeByName = function (name) {
    if (AreaMasterModel.done) {
        Object.keys(AreaMasterModel.data).forEach(function (key) {
            var area_master_model = AreaMasterModel.data[key];
            if (area_master_model.name == name) {
                return area_master_model.mastercode;
            }
        })
    }
    return -1;
};

AreaMasterModel.data = [];
AreaMasterModel.done = false;

$(document).ready(function () {
    function setData(data) {
        AreaMasterModel.data = data;
        AreaMasterModel.done = true;
        Event.update();
    }

    AreaMasterModel.readCSV(setData);
});
