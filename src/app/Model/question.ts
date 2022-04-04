export interface question{
    correctRepNum: number ;
    rep1: string;
    rep2: string;
    rep3: string;
    rep4: string;
    questionText: string;

    addQuestionValue(questionT:string ,x:string,y:string,z:string,a:string,correctRep:number):void;
    


}