import { question } from './question';
export class questionImpl implements question{
    correctRepNum: number =0;
    rep1: string="";
    rep2: string="";
    rep3: string="";
    rep4: string="";
    questionText: string="";

    
    addQuestionValue(questionT:string ,x:string,y:string,z:string,a:string,correctRep:number ): void {
        this.correctRepNum=correctRep;
        this.rep1=x;
        this.rep2=y;
        this.rep3=z;
        this.rep4=a;
        this.questionText=questionT;
    }

}