import{test}from'node:test';import assert from'node:assert/strict';import{fresh,calculateWeeklyMinutes,calculateShiftMinutes,weeklyBase,validateContract,cloneContract,buildContractDocument}from'./src/domain.ts';
test('24시간 및 주 기본임금 288000원',()=>{const c=fresh();c.shifts.forEach((s,i)=>s.enabled=[0,2,4].includes(i));c.amount=12000;assert.equal(calculateWeeklyMinutes(c),1440);assert.equal(weeklyBase(c),288000)});
test('명시적 자정 넘김',()=>{assert.equal(calculateShiftMinutes({start:'22:00',end:'02:00',next:true,rest:0}),240);assert.throws(()=>calculateShiftMinutes({start:'22:00',end:'02:00',next:false,rest:0}))});
test('휴게 초과·미입력·음수 차단',()=>{for(const rest of[540,600,-1,null])assert.throws(()=>calculateShiftMinutes({start:'09:00',end:'18:00',next:false,rest}))});
test('종료일 역전 차단',()=>{let c=fresh();c.term='기간제';c.start='2026-12-01';c.end='2026-01-01';assert.ok(validateContract(c).some(x=>x.ruleId==='V02'))});
test('미래 연도 승인 규칙 누락',()=>{let c=fresh();c.start='2099-01-01';assert.ok(validateContract(c).some(x=>x.ruleId==='V05'&&x.status==='unknown'&&x.severity==='blocking'))});
test('복제 시 개인정보·교부·버전 초기화',()=>{let c=fresh();c.worker='가상';c.workerContact='123';c.delivery=[{}];c.snapshots=[{}];let x=cloneContract(c);assert.notEqual(x.id,c.id);assert.equal(x.worker,'');assert.equal(x.workerContact,'');assert.equal(x.delivery.length,0);assert.equal(x.snapshots.length,0)});
test('문서 원문은 구조화 텍스트',()=>{let c=fresh();c.clauses='<script>alert(1)</script>';assert.ok(buildContractDocument(c).sections.some(x=>x.text.includes(c.clauses)))});
