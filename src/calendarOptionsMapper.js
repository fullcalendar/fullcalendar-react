export default class CalendarOptionsMapper {

	getOptions(properties) {
		let newProps = {};
		for (const key in properties) {
      if (properties.hasOwnProperty(key)) {
        newProps[key] = properties[key];
      }
    }
    return newProps;
	}
}	