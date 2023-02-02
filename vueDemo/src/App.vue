<template>
  <div id="app">
    <p>
      一般EXCEL 样式化--- 1
    </p>
    <p>
      包含格式处理，每个单元格处理值等
    </p>
    <button style="border: solid 4px red" @click="npmExcelByNpmtest">
      easy Excel for yalc
    </button>
    <p>
     复杂EXCEL 样式化--- 2
    </p>
    <p>
      包含HTML格式，单元格合并，图片处理
    </p>
     <button style="border: solid 4px red" @click="complexExcel">
      稍复杂表格--> 先点左边生成canvas，方便插入图
    </button>

    <button  @click="html2canvasFunc">html2canvas test</button>
    <div id="htmlCanvas" style="position:absolute;right:0px;top:0px;">
        <div class="content">
          Begin
        </div>
        <div class="arrow"></div>
         <div class="content">
           ET make resevation on the workflow
        </div>
<div class="arrow"></div>
         <div class="content">
           TL confirm the work details with ET
        </div>
<div class="arrow"></div>
         <div class="content">
           Reviewer
            review the WR
        </div>
    </div>
  </div>
</template>

<script>


import html2canvas from 'html2canvas';

/* 一般表格数据MOCK */
import headArray from "./excelData/headarray";
import bodyarray from "./excelData/bodyarray";


/* 复杂表格数据Mock */
import {complexHead,complexBody} from "./excelData/complexData";

//import {createExcelByOneSheet as createExcelByOneSheet1,ExcelStyleTemplate as ExcelStyleTemplate1,getCellPosLetter} from "easyexceljs"
import {createExcelByOneSheet,ExcelStyleTemplate,getCellPosLetter,getExcelCellStyle} from "easyexceljs"

export default {
  name: "App",
  data(){
    return {
    }
  },
  components: {
  },
  methods: {
    npmExcelByNpmtest() {
         const excelOptions = {
            excelFileName: "普通表格样式",
            sheetName:'普通表格样式1'
        };

      //console.log("easyExcelVue:", createExcelByOneSheet1);
      //return;
      var _createExcelByOneSheet = new createExcelByOneSheet(excelOptions);

      var _head = [];

      headArray.forEach((i) => {
        _head.push({
          header: i.title,
          key: i.field,
          width: 25,
        });
      });

      _createExcelByOneSheet.sheetColumnsData = [..._head];
      _createExcelByOneSheet.sheetRowsData = [...bodyarray];

      //style测试
      var red = ExcelStyleTemplate.green;

      _createExcelByOneSheet.rowStyleOptions.push(red.rowStyle);
      //测试where
      let cellStyle = getExcelCellStyle('red'),
      cellStyleDefault = getExcelCellStyle('blue');

      console.log('**************************************************')
      console.log('**************************************************')
      _createExcelByOneSheet.setCellStyleByWhere({
        valueKey:'target',
        whereType:'<',
        whereValue:100
      },cellStyle)
      .setCellStyleByRowCellIndex([[3,3],[4,4],[2,2],[6,1]],cellStyleDefault)
      .setCellNoteTextByRowCellIndex([[3,3],[4,4],[2,2],[6,1]],['11111','22222','33333','444444'])
      .customSetValueByIndex([[4,2],[4,7],[4,8],[4,13],[4,14],[4,20],[5,2],[5,3]],function(cell){
        let {value} = cell;

        if(typeof value == 'string'){
            if(value.indexOf('%') > -1){
              value = value.replace('%','');
              cell.value = value / 100;
              cell.numFmt = '0.00%';
            }else if(!isNaN(parseFloat(value,10))){
              cell.value = parseFloat(value,10)
            }
        }
      }) 
      .customSetValueByIndex('*',function(cell){
          let {value} = cell;

          if(typeof value == 'string'){
              if(value.indexOf('%') > -1){
                let _temp = value.replace('%','');
                if(!isNaN(parseFloat(_temp,10))){
                   value = value.replace('%','');
                    cell.value = value / 100;
                    cell.numFmt = '0.00%';
                }
              }else if(!isNaN(parseFloat(value,10))){
                cell.value = parseFloat(value,10)
              }
          }
      })

     

     /*  .setCellStyleByWhere({
        valueKey:'LCL',
        whereType:'==',
        whereValue:3
      },cellStyleDefault) */

      _createExcelByOneSheet.saveAsExcel();
    },
    /*
      复杂表格
    */
    complexExcel(){
        const excelOptions = {
            excelFileName: "复杂表格样式",
            sheetName:'复杂表格样式1'
        };

        var _createExcelByOneSheet = new createExcelByOneSheet(excelOptions);
        var _head = [];
        complexHead.forEach((i) => {
          _head.push({
            header: i.header,
            key: i.key,
            width: i.width,
          });
        });

        _createExcelByOneSheet.sheetColumnsData = [..._head];
        _createExcelByOneSheet.sheetRowsData = [...complexBody];


        //style测试
        var firebrick = ExcelStyleTemplate.firebrick;

        _createExcelByOneSheet.rowStyleOptions.push(firebrick.rowStyle);
        //合并单元格
        _createExcelByOneSheet.mergeCells('B1:C1')('A1:A2')('D1:D2')('E1:F1')('G1:G2')();   //('D3:D5')
        //控制合并后的格式
        let alignObj =  { vertical: 'middle', horizontal: 'center' ,wrapText: true},
        alignContent = {vertical: 'middle', horizontal: 'left' ,wrapText: true};
        
        _createExcelByOneSheet.alignmentCells({cellName:'B1:C1',alignment:alignObj})
        ({cellName:'A1:A2',alignment:alignObj})({cellName:'D1:D2',alignment:alignObj})
        ({cellName:'E1:F1',alignment:alignObj})({cellName:'G1:G2',alignment:alignObj})
        ({cellName:'B2',alignment:alignObj})({cellName:'C2',alignment:alignObj})
        ({cellName:'E2',alignment:alignObj})({cellName:'F2',alignment:alignObj});

        //其他列处理
        let otherCells = [];
        otherCells = [3,4,5,6].map(num=>{
          return ['A','B','C','D','E','F','G'].map(letter=>{
            let res = letter+num
            return res
          })
        })
        otherCells = otherCells.flat();
        otherCells.forEach(cellName=>{
          _createExcelByOneSheet.alignmentCells({cellName:cellName,alignment:alignContent})
        })
     

        //设置富文本的值
        let B3richText = [
            {'font': {'size': 12,'color': {'argb': 'ff000000'}},'text': '1. System UX '},
            {'font': {'bold': true,'size': 13,'color': {'argb': 'ffb22222'}},'text': 'UX \n'},
            {'font': {'size': 12,'color': {'argb': 'ff000000'}},'text': '1. a.ET system access permission(Stable) \n'},
            {'font': {'size': 12,'color': {'argb': 'ff000000'}},'text': 'b.ET Network stability  \n'},
            {'font': {'size': 12,'color': {'argb': 'ff000000'}},'text': '2.Input form(Accepted by ET)'},
            {'font': {'bold': true,'size': 13,'color': {'argb': 'ffb22222'}},'text': ' C \n'},
            {'font': {'size': 12,'color': {'argb': 'ff000000'}},'text': '3.Material attached(If needed) '},
            {'font': {'bold': true,'size': 13,'color': {'argb': 'ffb22222'}},'text': ' C \n'},
        ],
        B4richText = [
            {'font': {'size': 12,'color': {'argb': 'ff000000'}},'text': '1.Input form&Material by ET submitted '},
            {'font': {'bold': true,'size': 13,'color': {'argb': 'ffb22222'}},'text': 'UX \n'},
            {'font': {'bold': true,'size': 12,'color': {'argb': 'ff000000'}},'text': '2.System \n'},
            {'font': {'size': 12,'color': {'argb': 'ff000000'}},'text': 'a.TL system access permission(Stable) '},
            {'font': {'bold': true,'size': 13,'color': {'argb': 'ffb22222'}},'text': ' CX \n'},
            {'font': {'size': 12,'color': {'argb': 'ff000000'}},'text': 'b.TL system Network stability '},
            {'font': {'bold': true,'size': 13,'color': {'argb': 'ffb22222'}},'text': ' UX \n'},
            {'font': {'size': 12,'color': {'argb': 'ff000000'}},'text': '3.Knowledge： '},
            {'font': {'bold': true,'size': 13,'color': {'argb': 'ffb22222'}},'text': ' CX \n'},
            {'font': {'size': 12,'color': {'argb': 'ff000000'}},'text': '4.Number available TL & coordinators  '},
            {'font': {'bold': true,'size': 13,'color': {'argb': 'ffb22222'}} ,outline:false,'text': ' CX-Mace \n'},
        ]
        _createExcelByOneSheet.RichTextCells({cellName:'B3',richText:B3richText})
       ({cellName:'B4',richText:B4richText})
       ({cellName:'B5',richText:B4richText})();


        //设置行高
        _createExcelByOneSheet.rowsHeight
        ({rowIndex:2,height:35})
        ({rowIndex:3,height:100})
        ({rowIndex:4,height:100})
        ({rowIndex:5,height:100})
        ({rowIndex:6,height:100})
        ({rowIndex:7,height:100})()

        //获取配图
        var _canvas = document.querySelector("#_canvas"),
        _base64Image = _canvas.toDataURL('image/png',1);
        
        _createExcelByOneSheet.ImageInWorkBookBase64({base64Image:_base64Image,tl:{col: 3.6, row: 2.4},ext:{ width: _canvas.width, height: _canvas.height }})

        _createExcelByOneSheet.saveAsExcel();
        
    },
    html2canvasFunc(){
      html2canvas(document.querySelector("#htmlCanvas")).then(function(canvas) {
          canvas.id = '_canvas';
          document.body.appendChild(canvas);
      });
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.arrow{width:2px;height:30px; background:#dc143c;margin:0px auto;
position:relative;}
.arrow::after{
  content:'';
  width: 0; 
  height: 0;
  border-width: 8px;
  border-style: solid;
  left:-5px; bottom:-7px; position:absolute;
  border-color:#aa3131 transparent transparent transparent;
}

.content{
  background:#dc143c; color:#fff; font-size:14px;
  width:120px;padding:10px;
}

.content:first-child{
  border-radius:10px;
}
</style>
