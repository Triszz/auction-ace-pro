import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Settings, Clock, Timer } from "lucide-react";

const settingsSchema = z.object({
  triggerMinutes: z.coerce
    .number()
    .min(1, "Thời gian kích hoạt phải lớn hơn 0")
    .max(60, "Thời gian kích hoạt không được vượt quá 60 phút"),
  extensionMinutes: z.coerce
    .number()
    .min(1, "Thời gian gia hạn phải lớn hơn 0")
    .max(120, "Thời gian gia hạn không được vượt quá 120 phút"),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const AdminAuctionSettings = () => {
  const { toast } = useToast();
  const [savedSettings, setSavedSettings] = useState({
    triggerMinutes: 5,
    extensionMinutes: 10,
  });

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: savedSettings,
  });

  const onSubmit = (data: SettingsFormValues) => {
    // Simulate saving settings
    setSavedSettings({
      triggerMinutes: data.triggerMinutes,
      extensionMinutes: data.extensionMinutes,
    });
    toast({
      title: "Lưu cài đặt thành công",
      description: `Đấu giá sẽ tự động gia hạn ${data.extensionMinutes} phút khi có lượt đặt giá trong ${data.triggerMinutes} phút cuối.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Cấu hình hệ thống đấu giá</h1>
          <p className="text-muted-foreground">
            Quản lý các tham số tự động gia hạn cho toàn bộ sản phẩm đấu giá
          </p>
        </div>

        <div className="grid gap-6 max-w-3xl">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle>Cài đặt tự động gia hạn</CardTitle>
              </div>
              <CardDescription>
                Cấu hình thời gian kích hoạt và thời gian gia hạn cho tất cả các phiên đấu giá
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="triggerMinutes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          Thời gian kích hoạt (phút)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="5"
                            {...field}
                            className="max-w-xs"
                          />
                        </FormControl>
                        <FormDescription>
                          Thời gian trước khi đấu giá kết thúc để kích hoạt tính năng gia hạn tự động
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="extensionMinutes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Timer className="h-4 w-4 text-primary" />
                          Thời gian gia hạn (phút)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="10"
                            {...field}
                            className="max-w-xs"
                          />
                        </FormControl>
                        <FormDescription>
                          Thời gian gia hạn thêm khi có lượt đặt giá trong khoảng thời gian kích hoạt
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button type="submit">Lưu cài đặt</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                    >
                      Đặt lại
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Cài đặt hiện tại</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">Thời gian kích hoạt:</span>
                  <span className="text-primary font-semibold">
                    {savedSettings.triggerMinutes} phút
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-primary" />
                  <span className="font-medium">Thời gian gia hạn:</span>
                  <span className="text-primary font-semibold">
                    {savedSettings.extensionMinutes} phút
                  </span>
                </p>
                <p className="text-muted-foreground pt-2 border-t">
                  <span className="font-medium">Quy tắc:</span> Khi có lượt đặt giá mới trong{" "}
                  <span className="text-foreground font-semibold">
                    {savedSettings.triggerMinutes} phút
                  </span>{" "}
                  cuối, đấu giá sẽ tự động gia hạn thêm{" "}
                  <span className="text-foreground font-semibold">
                    {savedSettings.extensionMinutes} phút
                  </span>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminAuctionSettings;
