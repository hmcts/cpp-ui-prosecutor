import { tflReducer } from '../tfl.reducer';
import { LoadCasesWithSjpNoticeCountSuccess, TflAction } from '../tfl.action';

describe(' Tfl reducer', () => {
  describe('default', () => {
    it('should set the state', () => {
      const result = tflReducer(undefined, {} as TflAction);
      expect(result).toMatchSnapshot();
    });

    it('should update state with cases sjp notices case data ', () => {
      const action = new LoadCasesWithSjpNoticeCountSuccess({ count: 10 });
      const result = tflReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });
});
