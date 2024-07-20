import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

export type Data = {
  title: string;
  value: string;
};

type DropdownListProps = {
  dropdownTitle: string;
  dropdownPlaceHolder: string;
  data: Data[];
};

const DropdownList = ({
  dropdownTitle,
  data,
  dropdownPlaceHolder,
}: DropdownListProps) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View>
            <Text
              style={{ fontFamily: "TajwalBold" }}
              className="text-end my-4 text-xl text-theme-quinary"
            >
              {dropdownTitle}
            </Text>
            <View style={styles.dropdownButtonStyle}>
              <View className=" flex-1 ">
                <Text
                  className="text-lg text-theme-quinary "
                  style={{ fontFamily: "TajwalBold" }}
                >
                  {(selectedItem && selectedItem.title) ||
                    `${dropdownPlaceHolder}`}
                </Text>
              </View>
              <View>
                <AntDesign
                  name={isOpened ? "caretup" : "caretdown"}
                  color={"#63637f"}
                />
              </View>
            </View>
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: "#D2D9DF" }),
            }}
          >
            <Text
              className="text-lg text-theme-quinary"
              style={{ fontFamily: "TajwalBold" }}
            >
              {item.title}
            </Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "100%",
    backgroundColor: "#d6d6df",
    height: 50,
    borderRadius: 12,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownMenuStyle: {
    height: 250,
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 15,
  },
});

export default DropdownList;
