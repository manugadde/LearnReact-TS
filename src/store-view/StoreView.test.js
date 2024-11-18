const { getLicensePlateCssClass } = require("./StoreView")

describe('Test StoreView', () => {
    test("check CSS class for license plates", async () => {
        expect(getLicensePlateCssClass(0)).toBe("highlight col-md-4")
        expect(getLicensePlateCssClass(1)).toBe("col-md-4")
    })
});