/**
 * Created by minto on 15/08/19.
 */

var Search = new Object();

/**
 * textからAreaModelを持ってくる(nameとの完全一致)
 * textと一致するものが無ければnullを返す
 */
Search.getMatchArea = function(text){
    var return_value = null;
    function searchMatchName(area){
        if(area.name==text){
            return_value = area;
        }
    }

    var data = AreaModel.data;
    data.forEach(searchMatchName);
    return return_value;
};

/**
 * textから検索補完の候補を取得する
 * return AreaModel
 */
Search.getCandidate = function(text){
    var return_area = [];
    function pushCandidate(area){
        if(area.name.indexOf(text)!=-1 || area.furigana.indexOf(text)!=-1){
            return_area.push(area);
        }
    }

    AreaModel.data.forEach(pushCandidate);
    return return_area;
};

/**
 * 検索用のinputが変更されたときの処理。
 */
Search.updateInput = function(){
    var input = $("#input_area").val();
    var area = Search.getMatchArea(input);

    if(area!=null){
        var area_master = AreaMasterModel.data[area.mastercode-1];
        console.log(area_master);
    }

    var area_candidate = Search.getCandidate(input);
    console.log("candidate: "+area_candidate[0].name);
    console.log(input);
    console.log(area);
};

$("#input_area").keyup(Search.updateInput);