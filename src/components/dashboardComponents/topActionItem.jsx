import { Badge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const TopActionItem = ({ toggleActionItem, actionItems }) => {
  return (
    <>
      <h2
        id="actions-heading"
        className="text-lg font-semibold text-gray-900 sr-only"
      >
        Action Items
      </h2>

      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-gray-700">
            Top Action Items
          </CardTitle>
          <p className="text-sm text-gray-600">
            Recommended improvements to boost your score
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {actionItems?.length > 0 ? (
            <>
              {actionItems?.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={`action-${index}`}
                      onCheckedChange={() => toggleActionItem(index)}
                      className="mt-1 text-gray-900 checked:bg-blue-600"
                      aria-describedby={`action-${index}-priority`}
                    />
                    <div className="flex-1 space-y-1">
                      <label
                        htmlFor={`action-${index}`}
                        className={`text-sm font-medium cursor-pointer block text-gray-600`}
                      >
                        {item}
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div>
                <div className="flex items-center justify-center flex-col gap-2 py-10">
                  <Badge className="text-gray-400" size={40} />
                  <p className="text-sm text-gray-500">No Action Items</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default TopActionItem;
