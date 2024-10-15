import { formatCurrency } from "../../scripts/utils/money.js"; 

describe("Test suite: formatCurrency", ()=>{
    it('Convert price into dollers', ()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('Works only with 0', ()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('Returns the nearest round value as the price', ()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});
