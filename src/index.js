export class Add {

    calculate(a,b) {
        return a + b;
    }
}

export class Subtract {

    calculate(a,b) {
        return a - b;
    }
}

export class LambdaTest {

    mapAndFilter(array) {
        return array.map(x=>x*x).filter(x=>x%2);
    }
}
