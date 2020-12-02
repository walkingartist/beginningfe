//制表
var page=0;
window.onload=function load()
{
        var tr;
        var td;
        var table=document.getElementById("table");
        for(var i=0;i<5;i++)
        {
            tr=document.createElement("tr");
            table.appendChild(tr);
            for(var j=0;j<9;j++)
            {  
                td=create(i,j);
                tr.appendChild(td);
            }
        }
        click();
    }
    ///////////////////////////
        // function edit(i,j) {
        //     var table=document.getElementById("table");
        //     var rows=table.rows;
        //     rows[i].cells[j].innerHTML=prompt("请输入需要修改的值","张三");  
        // }
    function click(){
        var table=document.getElementById("table");
        var rows=table.rows;
        var time=null;
        for(var i=1;i<rows.length;i++)
        {
           for(var j=0;j<8;j++){
            // rows[i].cells[j].onclick=function onclick(i){alert(i)}(i);
            rows[i].cells[j].onclick=function onclick(i,j) {
                var i=i;
                clearTimeout(time);
                // time=setTimeout(    function (i,j) {var table=document.getElementById("table");var rows=table.rows;alert("rows="+i);console.log(rows[i])}    ,   300   );
                // time=setTimeout(    "click1('"+i+"','"+j+"')"    ,   300   );
                time=setTimeout( "onclick('"+i+"')", 300);
                // var table=document.getElementById("table");
                // var rows=table.rows;
                // alert(this.innerHTML);
            }
            // rows[i].cells[j].setAttribute("ondblclick",edit(i,j));
            rows[i].cells[j].ondblclick=function () {
                clearTimeout(time);
                var temp=prompt("请输入",this.innerHTML);
                if (temp!=null)
                this.innerHTML=temp;
            }
           }
        }
        var pag=document.getElementById("page");
        pag.innerText='第'+(page+1)+'页';
    }

    function click1(i,j){
        var table=document.getElementById("table");var rows=table.rows;alert("rows="+i);console.log(rows[i]);
        // alert("jj");
    }
    function onclick(i)
    {
        alert("hhh");
    }
     
    function create(i,j) {
        var td=document.createElement("td");
        td.style.color="grey";
        // if(j==1)        td.innerHTML='<select id="mySelect"><option></option><option>男</option><option>女</option></select>';
        // else if(j==2)   td.innerHTML='<select id="mySelect"><option></option><option>单身</option><option>已婚</option></select>'; 
        // else if(j==8)   {td.innerHTML='<input type="checkbox" name="del" id="del" value="1" >';td.style.display="none";}
        if   (j==8)   {td.innerHTML='<input type="checkbox" name="del" id="del" value="1" >';td.style.display="none";} 
        else           {td.innerHTML='<td id="hh">row='+(i+1)+',col='+(j+1)+'</td>';}
        return td;
     }
     function create2(i,j) {
        var td=document.createElement("td");
        td.style.color="grey";
        // if(j==1)        td.innerHTML='<select id="mySelect"><option></option><option>男</option><option>女</option></select>';
        // else if(j==2)   td.innerHTML='<select id="mySelect"><option></option><option>单身</option><option>已婚</option></select>'; 
        // else if(j==8)   {td.innerHTML='<input type="checkbox" name="del" id="del" value="1" >';td.style.display="";}
        if   (j==8)   {td.innerHTML='<input type="checkbox" name="del" id="del" value="1" >';td.style.display="";} 
        else           {td.innerHTML='<td  onclick="alert("h")" id="hh">row='+i+',col='+(j+1)+'</td>';}
        a(page);
        return td;
     }

    //添加
    function add(){
        var tr;
        var td;
        var table=document.getElementById("table");
        var i=table.rows.length;
            tr=document.createElement("tr");
            table.appendChild(tr);
            for(var j=0;j<9;j++)
            {
                td=create2(i,j);
                tr.appendChild(td);
            }
    }
   //批量添加
    function addm(){
        var tr;
        var td;
        var table=document.getElementById("table");
        var t=table.rows.length-1;
        var n=prompt("请输入要添加的行数","1");
        for(var i=0;i<n;i++)
        {
            tr=document.createElement("tr");
            table.appendChild(tr);
            for(var j=0;j<9;j++)
            {
                t=table.rows.length-1;
                td=create2(t,j);
                tr.appendChild(td);
            }
        }
    }

    //删除
    function del(){
        var table=document.getElementById("table");
        var last=table.lastChild;
        if(confirm("您确定要删除嘛？")==true)
        table.removeChild(last);
        a(page);
    }
    //选择删除
    function odel() {
        var table=document.getElementById("table");
        var id = document.getElementsByName('del');
        var rows=table.rows;
        var t=[];
        for(var i = 0; i < id.length; i++){
         if(id[i].checked==true)       //勾中 存行
            t.push(i);
        }
        if(t.length==0)
            alert("未选中！");
        else
        {
            if(confirm("您确定要删除嘛？")==true) 
            {
                for(var i=0;i<t.length;i++)           
                        table.removeChild(rows[t[i]+1-i]);
                         //注意删除流动性 删完已改变整体行数
            }
        }
        a(page);
    }
 
//查找
    function find(){
        var input, value, table, td, i;
        input = document.getElementById("myInput");
        value= input.value.toUpperCase();
        table = document.getElementById("table");
        tr = table.getElementsByTagName("tr");
        var rows=table.rows;
        var r=[],c=[],np=[],all=[];   
        for(i=1;i<rows.length;i++)
        {
            td=rows[i].cells;
            for(var j=0;j<9;j++)
            {
              if (td[j]) 
              {
                if (td[j].innerHTML.toUpperCase().indexOf(value)> -1)  
                 {
                     td[j].style.backgroundColor="yellow";
                     r.push(i);
                     c.push(j+1);
                     parseInt(i/5)==i/5? np.push(parseInt(i/5)) :np.push(parseInt(i/5)+1);
                 }
               }       
            }
        }
        if(r.length>=1)
        {
            for(i=0;i<r.length;i++)
            all.push("第"+np[i]+"页，第"+r[i]+"行，第"+c[i]+"列"+"\n");
            alert(all.join(""));    //祛痘
        }    
        else
        alert("抱歉，未找到！");
    }
    function find2(){
         var input, value, table, td, i;
         input = document.getElementById("myInput");
         value= input.value.toUpperCase();
         table = document.getElementById("table");
         var rows=table.rows;
         for(i=1;i<rows.length;i++)
         {
             var tem=0;
             td=rows[i].cells;
             for(var j=0;j<9;j++)
             {
               if (td[j]) 
               {
                 if (td[j].innerHTML.toUpperCase().indexOf(value)> -1)  
                  {
                      rows[i].style.display = "";
                      td[j].style.backgroundColor= "red";
                      tem++;
                  }         
                }              
             }
             if(tem==0)
             rows[i].style.display = "none";
         }
    }

//菜单    
    function reveal(){
        var i=1;
        var div1=document.getElementById("div1");
        div1.style.display="";
        var btn=document.getElementById("btn");
        btn.innerText="完成";
        var table=document.getElementById("table");
        var rows=table.rows;
        var td;
        for(var n=1;n<rows.length;n++){
            td=rows[n].cells[8];
            td.style.display="";
        }
        
        btn.onclick=function finish(){
            if(i%2==0)
            {
                i++;
                div1.style.display="";
                btn.innerText="完成";
                for(var n=1;n<rows.length;n++){
                    td=rows[n].cells[8];
                    td.style.display="";
                }
            }
            else{
                i++;
                div1.style.display="none";
                btn.innerText="编辑";
                for(var n=1;n<rows.length;n++){
                    td=rows[n].cells[8];
                    td.style.display="none";
                }
            }
        }
    }

//跳转
function prev(){
    if(page==0)
    alert("已经是是第一页");
    else
    {
        page--;
        a(page);
    }
    var pag=document.getElementById("page");
    pag.innerText='第'+(page+1)+'页';
}
function next(){
    var table=document.getElementById("table");
    var rows=table.rows;
    var n=rows.length;
    if(page>=((n-1)/5)-1)
    alert("已经是最后一页");
    else
    {
        page++;
        a(page);
        var pag=document.getElementById("page");
        pag.innerText='第'+(page+1)+'页';
    }
}
function turn(){
    var table=document.getElementById("table");
    var rows=table.rows;
    var n=rows.length;
    var prev=page;
    page=document.getElementById("turnp").value-1;
    if(page>((n-1)/5))
        {
            page=prev;
            document.getElementById("turnp").value=page+1;
            alert("越界");
        }
    else
    {
        a(page);
        var pag=document.getElementById("page");
        pag.innerText='第'+(page+1)+'页';
    }
}
//显示对应页码
function a(page){
    var table=document.getElementById("table");
    var rows=table.rows;
    var n=rows.length;
    if (n>6)
    {
        for(var i=page*5+1;i<(page*5+6),i<n;i++)
        {
            rows[i].style.display="";
            rows[i].style.backgroundColor="white";
        }
        for(var i=1;i<page*5+1;i++)
        rows[i].style.display="none";
        for(var i=page*5+6;i<n;i++)
        rows[i].style.display="none";
    }
}
//全选
function chose_all(){
    var id = document.getElementsByName('del');
    for(var i=0;i<id.length;i++)
        id[i].checked=true;
}
function cancel_all(){
    var id = document.getElementsByName('del');
    for(var i=0;i<id.length;i++)
        id[i].checked=false;
}
function returning(){
    a(page);
    console.log(page);
}