import {readdir,stat} from 'fs';
import path from 'path';

type ItemInfo = {
    dir:string;
    name:string;
    isDir:boolean;
}

function ReaddirPromise(item:ItemInfo):Promise<ItemInfo[]>{
    return new Promise<ItemInfo[]>((resolve,reject)=>{
        readdir(item.dir,(err,items)=>{
            if (err){
                reject(err);
                return;
            }
            const results:ItemInfo[] = items.map(itemName=>({
                dir:item.dir,
                name:itemName,
                isDir:false
            }))
            resolve(results);
        });
    })
}

function StatsPromise(item:ItemInfo){
    return new Promise((resolve,reject)=>{
        const fullPath = path.join(item.dir,item.name);
        stat(fullPath,(err,stats)=>{
            if (err){
                reject(err);
                return;
            }
            const result:ItemInfo = {
                dir:item.dir,
                name:item.name,
                isDir:stats.isDirectory()
            }
            resolve(result);
        })
    })
}

function listAllFilesRecursive(dirInfo:ItemInfo){
    return new Promise((resolve,reject)=>{
        ReaddirPromise(dirInfo).then((items:ItemInfo[])=>{
            return items;
        }).then((items:ItemInfo[])=>{
            const itemList = items.map(item=>StatsPromise(item));
            return Promise.all(itemList);
        }).then(itemInfoArr=>{
            const folderList = itemInfoArr.map((itemInfo:ItemInfo)=>itemInfo.isDir
            ?listAllFilesRecursive({
                dir:path.join(itemInfo.dir,itemInfo.name),
                name:"",
                isDir:true
            })
            :Promise.resolve({
                dir:itemInfo.dir,
                name:itemInfo.name,
                isDir:false
            }));
            return Promise.all(folderList);
        }).then(results=>{
            resolve(results);
        })
    });
}

//let answer = []; //Side Effect
function printClosure(){
    //Map : Key-Values Collection
    //Object key: string,number
    //Map: key: object, functions add/update/check
    /*
    'sample/folder2': [file2.js,text2,txt]
    */
    //Tips: reduce + ... spread operator
    /*
    {
         'sample/folder1':{
             subFolder1:{
                 subSubFolder1:{
                     subSubSubFolder1:[ 'files.js' ]
                 },
                 files:[ 'file3.js' ]
             }
             files:['file1.js']
         }
    } 
    */
    let results = new Map();
    return (items:ItemInfo[],recursiveCall:any)=>{
        for(let item of items){
            if (Array.isArray(item)){
                recursiveCall(item,recursiveCall);
            }else{
                //File
                if (results.has(item.dir)){
                    if (path.extname(item.name) === ".js") {
                        const folder = results.get(item.dir);
                        folder.push(item.name);
                        results.set(item.dir, folder);
                    }
                }else{
                    results.set(item.dir,[item.name]);
                }
            }
        }
        return results;
    }
}

listAllFilesRecursive({dir:"./sample",name:"",isDir:true}).then((results:ItemInfo[])=>{
    const printFunc = printClosure();
    const data = printFunc(results,printFunc);
    console.log(data);
});