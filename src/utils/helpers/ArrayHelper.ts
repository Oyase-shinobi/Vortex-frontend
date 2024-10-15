class ArrayHelper {
  static moveToNewIndex = (
    list: Array<any>,
    oldIndex: number,
    newIndex: number,
  ) => {
    if (newIndex >= list.length) {
      let k = newIndex - list.length + 1;
      while (k--) {
        list.push(undefined);
      }
    }
    const moveItem = list.splice(oldIndex, 1)[0];
    list.splice(newIndex, 0, moveItem);
    return list;
  };
}

export default ArrayHelper;
